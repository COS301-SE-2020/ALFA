const express = require('express')
const router = express.Router()
const KB_Article = require('../models/kb_article')
const MongoClient = require('mongodb').MongoClient;
const analysisHistory = require('../models/history');

/**
 * NB: the 'link' attribute should be unique, sending duplicates will return error with code 100
 */

 function handleErrors(error, res) {
    console.log(error!=null?error:"Check API Console For more Info")
    // error!=null? res.json({message:error}): res.json({message:"Check API Console For more Info"}) 
 }
 // Endpoint to add articles to the DB
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
        // console.log(file)
    } catch (error) {
       handleErrors(error,res)
    }
})

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
        // console.log(file)
    } catch (error) {
       handleErrors(error,res)
    }
})

// Endpoint to retrieve all KB articles
router.get('/', async(req, res)=>{
    try {
        const AllArticles = await KB_Article.find()
        console.log("Data recieved!")
        res.json(AllArticles)
    } catch (error) {
        handleErrors(error)
    }
})

// Endpoint to retrieve analysis history
router.get('/history/:userId/:limit', async(req, res)=>{
    try {
    	let data = req.params;

    	let results = await analysisHistory.find({user_id : data.userId})
    		.limit(data.limit)
    		.exec();

    	res.status(200).json(results);
    } catch (error) {
        handleErrors(error)
    }
})

// Endpoint to append KB article to existing articles
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

// Endpoint to up or dowm vote suggestions from a specific KB article 
router.post('/rate_article', async(req, res)=>{
    try {
        //get data from request
        let data = req.body
        
        //get specific KB with the suggestion up or down voted by user
        let articleKey={"kb_index":data.kb_index}
        const Article = await KB_Article.findOne(articleKey)
       
        if(Article !=null){
            //update vote for specific suggestion of a specifc KB
            Article.suggestions.forEach(element => {
                if(element._id==data._id){
                    element.votes+=data.vote;
                }
            });

            // updating 
            const updated = await KB_Article.findOneAndUpdate(articleKey, {
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

module.exports = router
