const express = require('express')
const router = express.Router()
const KB_Article = require('../models/kb_article')

router.post('/', async(req,res)=>{
    try {
        let data = req.body
        // console.log("data recieved")
        // console.log(data)
        const file = new KB_Article({
            link:data.link
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
router.get('/', async(res,req)=>{
    try {
        const AllArticles = await KB_Article.find()
        // console.log("data recieved:")
        // console.log(AllArticles)
        req.json(AllArticles)
    } catch (error) {
        console.log(error)
        req.json({message:error})
    }
})
module.exports = router
