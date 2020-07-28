const express = require('express')
const router = express.Router()
const KB_Article = require('../models/kb_article')

/**
 * the 'link' attribute should be unique, sending duplicates will return error with code 100
 */
router.post('/', async(req,res)=>{
    try {
        let data = req.body
        const maxIndexDoc = await KB_Article.findOne().sort("-kb_index");

        const file = new KB_Article({
            kb_index: (maxIndexDoc.kb_index + 1),
            description: data.description,
            link: data.link,
        })

        const newFile = await file.save()
        res.json(newFile)
        console.log("New Record Saved!")
        // console.log(newFile)
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
})

// Endpoint to retrieve all KB articles
router.get('/', async(req, res)=>{
    try {
        const AllArticles = await KB_Article.find()
        // console.log("data recieved:")
        // console.log(AllArticles)
        res.json(AllArticles)
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
})

/* // get top N records/documents.
router.get('/:limit', async(req, res) => {
    try{
        const limit = parseInt(req.params.limit);
        // const limitedArticles = await KB_Article.find().sort({_id: 1}).limit(limit);
        const limitedArticles = await KB_Article.aggregate([ {$sample: {size: limit} } ]);
        res.json( limitedArticles );
        console.log(`Returning ${limit} articles`);
    }catch(error){
        res.json({message: error});
    }
}) */
module.exports = router
