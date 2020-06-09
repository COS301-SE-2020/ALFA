const express = require('express')
const router = express.Router()
const Logfile = require('../models/log_file')

//Endpoint to save uploded file contents to db
router.post('/', async(req,res)=>{
    try {
        let data = req.body
        const file = new Logfile({
            filename:date.filename,
            date:data.date,
            content:data.content
        })

        const newFile = await file.save()
        res.json(newFile)
        console.log("New Record Saved!")
        console.log(newFile)
    } catch (error) {
        res.json({message:error})
        console.log(error)
    }
})

//Endpoint to retrieve all logfiles
router.get('/', async(res,req)=>{
    try {
        const AllFiles = await Logfile.find()
        res.json(AllFiles)
    } catch (error) {
        res.json({message:error})
        console.log(error)
    }
})