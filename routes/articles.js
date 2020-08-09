const express = require('express')
const router = express.Router()
const KB_Article = require('../models/kb_article')

/**
 * NB: the 'link' attribute should be unique, sending duplicates will return error with code 100
 */

 function handleErrors(error, res) {
    console.log(error!=null?error:"Check API Console For more Info")
    error!=null? res.json({message:error}): res.json({message:"Check API Console For more Info"}) 
 }

router.post('/', async(req,res)=>{
    try {
        let data = req.body
        // console.log(`\n\ndata ${data}\n\n`)

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


        const newFile = await file.save()
        // res.json(newFile)
        res.json({message:"New Record Saved!"})
        console.log("New Record Saved!")
        // console.log(newFile)
    } catch (error) {
       handleErrors(error)
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

// Endpoint to append KB article to existing articles
router.put('/', async(req, res)=>{
    try {
        //get data from request
        let data = req.body
        
        //get data from DB
        let searckKey={"kb_index":data.kb_index}
        const Article = await KB_Article.findOne(searckKey)
        
        //get the highest index of the suggestions
        let ix=0;
        Article.suggestions.forEach(elem => {
            if(elem.sug_index>ix) ix=elem.sug_index
        });
        
        //add new info to article's suggestion array
        Article.suggestions.push({
            //tried to manually handle indices
            // sug_index: ix!=null?(ix + 1):0,
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

        console.log({message: "Update Successful!"})
        res.json({message: "Update Successful!"})

    } catch (error) {
       handleErrors(error, res)
    }
})

//NB: NEVER LEAVE ZOMBIE CODE LEST STATED OTHERWISE!
module.exports = router
