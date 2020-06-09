const express = require('express')
const router = express.Router()
const KB_Article = require('../models/kb_article')

//Endpoint to save uploded file contents to db
router.post('/', async(req,res)=>{
    try {
        let data = req.body
        const article = new KB_Article({
            
        })

        const newArticle = await article.save()
        res.json(newArticle)
        console.log("New Record Saved!")
        console.log(newArticle)
    } catch (error) {
        res.json({message:error})
        console.log(error)
    }
})

//Endpoint to retrieve all logfiles
router.get('/', async(res,req)=>{
    try {
        const AllArticles = await KB_Article.find()
        res.json(AllArticles)
    } catch (error) {
        res.json({message:error})
        console.log(error)
    }
})