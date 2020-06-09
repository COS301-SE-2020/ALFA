const express = require('express')
const router = express.Router()
const KB_Article = require('../models/kb_article')

// Endpoint to retrieve all KB articles
router.get('/', async(res,req)=>{
    try {
        const AllArticles = await KB_Article.find()
        res.json(AllArticles)
    } catch (error) {
        res.json({message:error})
        console.log(error)
    }
})

module.export = router
