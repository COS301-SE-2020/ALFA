const express = require('express')
const router = express.Router()
const KB_Article = require('../models/kb_article')
const MongoClient = require('mongodb').MongoClient;

/**
 * NB: the 'link' attribute should be unique, sending duplicates will return error with code 100
 */
/**
 * @brief handles error e.i to desiplay them accordingly
 * @param {object} error an object that contains an error message
 * @returns well formatted error response object 
 */
 function handleErrors(error, res) {
    console.log(error!=null?error:"Check API Console For more Info")
    error!=null? res.json({message:error}): res.json({message:"Check API Console For more Info"}) 
 }

/**
 * @brief Endpoint to add articles to the DB
 * @param {object} req an object that contains properties that can form a Knowledge-base article.
 *                  e.i description and link
 * @returns success message as an object
 */
router.post('/', async(req,res)=>{
    try {
        let data = req.body

        //get the maximum index out of all KB articles
        const maxIndexDoc = await KB_Article.findOne().sort("-kb_index");

        const file = new KB_Article({
            kb_index: maxIndexDoc!=null?(maxIndexDoc.kb_index + 1):0,
            suggestions:{
                votes:0,
                description: data.description,
                link: data.link
            }
        })

        const newFile = await KB_Article.create(file);
        res.json({message:"New Record Saved!"})
        console.log("New Record Saved!")
    } catch (error) {
       handleErrors(error,res)
    }
})

/**
 * @brief Endpoint to add an analysis history record to the DB
 * @param {object} req an object that contains properties that can form a Knowledge-base article.
 *                  e.i description and link [old]
 * @returns success message as an object
 */
router.post('/history', async(req,res)=>{
    try {
        let data = req.body

        const file = new History({
            suggestions:{
                votes:0,
                description: data.description,
                link: data.link
            }
        })

        const newFile = await KB_Article.create(file);
        res.json({message:"New Record Saved!"})
        console.log("New Record Saved!")
    } catch (error) {
       handleErrors(error,res)
    }
})

/**
 * @brief Endpoint to retrieve all KB articles
 * @returns All the articles ever stored in the database
 */
router.get('/', async(req, res)=>{
    try {
        const AllArticles = await KB_Article.find()
        console.log("Data recieved!")
        res.json(AllArticles)
    } catch (error) {
        handleErrors(error)
    }
})

/**
 * @brief Endpoint to retrieve all analysis history  [old & hacked]
 * @returns all the history records ever stored in the database
 */
router.get('/history', async(req, res)=>{
    try {
        let Histories =[];
        MongoClient.connect(process.env.DB_CONNECTION, async(error, client)=>{
            if(error){
                handleErrors(error, res);
            }
            Histories = await client.db('ALFA_DB').collection('analysis_history').find().toArray()
            console.log("Data recieved!")
            res.json( Histories)
        })
        
    } catch (error) {
        handleErrors(error)
    }
})

/**
 * @brief Endpoint to append or add suggestions to the database
 * @param {object} req an object that contains properties that can form a Knowledge-base article.
 *                  e.i kb-index, description and link 
 */
router.post('/suggestion', async(req, res)=>{
    try {
        //get data from request
        let data = req.body
        
        //get data from DB
        let searckKey={"kb_index":data.kb_index}
        const Article = await KB_Article.findOne(searckKey)
      
        if(Article !=null){
            //add new info to article's suggestion array
            Article.suggestions.push({
                votes:0,
                description: data.description,
                link: data.link
            })
            
            // updating 
            const updated = await KB_Article.findOneAndUpdate(searckKey, {
                $set: {
                    kb_index:Article.kb_index,
                    suggestions: Article.suggestions
                }
            })

            console.info({message: "Update Successful!"})
            res.json({message: "Update Successful!"})
        }else{
            console.log({message: `No KB Article with index ${searckKey.kb_index} was found!`})
            res.json({message: `No KB Article with index ${searckKey.kb_index} was found!`})
        }
    } catch (error) {
       handleErrors(error, res)
    }
})

/**
 * @brief Endpoint to up or dowm vote suggestions from a specific KB article 
 * @param {object} req an object that contains properties that can form a Knowledge-base article.
 *                  e.i description and link [old]
 */
router.post('/rate_article', async(req, res)=>{
    try {
        //get data from request
        let data = req.body
        
        //get specific KB with the suggestion up or down voted by user
        let articleKey={"suggestions.link":data.link}
        const Article = await KB_Article.findOne(articleKey)
       
        if(Article !=null){
            //update vote for specific suggestion of a specifc KB
            let actual_votes=-1;
            Article.suggestions.forEach(element => {
                // if(){
                    element.votes+=data.vote;
                    actual_votes=element.votes;
                // }
            });

            // updating 
            const updated = await KB_Article.findOneAndUpdate(articleKey, {
                $set: {
                    kb_index:Article.kb_index,
                    suggestions: Article.suggestions
                }
            })

            console.info({message: data.vote==-1? "Down Voting Successful!": "Up voting Successful!",
                votes: Article.suggestions.votes
            })
            res.json({
                message: data.vote==-1? "Down Voting Successful!": "Up voting Successful!",
                votes: Article.suggestions[0].votes
            })
        }else{
            console.log({message: `No KB Article with index ${articleKey.suggestions.link} was found!`})
            res.json({message: `No KB Article with index ${articleKey.suggestions.link} was found!`})
        }
    } catch (error) {
       handleErrors(error, res)
    }
})

module.exports = router
