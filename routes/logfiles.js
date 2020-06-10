//BY JABULANI SHILI
const express = require('express')
const router = express.Router()
const Logfile = require('../models/log_file')

//Endpoint to save uploded file contents to db
router.post('/', async(req,res)=>{
    try {
        let data = req.body
        const file = new Logfile({
            filename:data.filename,
            date:data.date,
            content:data.content
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

//Endpoint to retrieve all logfiles
router.get('/', async(req, res)=>{
    try {
        const AllFiles = await Logfile.find()
        // console.log("data recieved:")
        // console.log(AllFiles)
        res.json(AllFiles) 
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
})
module.exports = router