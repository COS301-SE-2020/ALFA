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
 * @brief Endpoint to append or add suggestions to the database
 * @param {object} req an object that contains properties that can form a Knowledge-base article.
 *                  e.i kb-index, description and link 
 */
router.post('/suggestion', async(req, res)=>{
    try {
        //get data from request
        let data = req.body
        
        //get data from DB
        let searckKey={"suggestions.link":data.link}
        const Article = await KB_Article.findOne(searckKey)
      
        if(Article !=null){
            //add new info to article's suggestion array
            Article.suggestions.push({
                votes:0,
                description: data.description,
                link: data.link,
                comment:data.comment
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
            let response ={message: `No KB Article with URL '${data.link}' was found!`}
            console.log(response)
            res.json(response)
        }
    } catch (error) {
       handleErrors(error, res)
    }
})

/**
 * @brief Endpoint to up or dowm vote suggestions from a specific KB article 
 * @param {object} req an object that contains the link/URL of a specific KB 
 *                  and a vote value (-1 to down vote or 1 to up vote a KB article )
 * @returns {object} res that has a success message and the current votes of the KB
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
                if(element.link==data.link){
                    element.votes+=data.vote;
                    actual_votes=element.votes;
                }
            });

            // updating 
            const updated = await KB_Article.findOneAndUpdate(articleKey, {
                $set: {
                    kb_index:Article.kb_index,
                    suggestions: Article.suggestions
                }
            })

            let response= {
                message: data.vote==-1? "Down Voting Successful!": "Up voting Successful!",
                votes: actual_votes
            }

            console.info(response)
            res.json(response)
        }else{
            let response ={message: `No KB Article with URL '${data.link}' was found!`}
            console.log(response)
            res.json(response)
        }
    } catch (error) {
       handleErrors(error, res)
    }
})

module.exports = router
