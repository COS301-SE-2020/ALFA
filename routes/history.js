const express = require('express')
const router = express.Router()
const History = require('../models/history')

/**
 * @brief handles error e.i to desiplay them accordingly
 * @param {object} error an object that contains an error message
 * @returns well formatted error response object 
 */
 function handleErrors(error, res) {
    console.log(error!=null?error:"Check API Console For more Info")
    error!=null? res.json({message:error}): res.json({message:"Check API Console For more Info"}) 
 }

 
router.get('/count', async(req, res)=>{
    const History_count = await History.find().count({}, (err, count)=>{
        if (err){
            console.log(err)
        }
        return count;
    })

    if(History_count!=null){
        let resp={
            count: History_count
        }
        console.log(resp)
         res.json(resp)
    }
})


router.get('/count/:email', async(req, res)=>{
    const searckKey={"email":req.params.email}
    const History_count = await History.find(searckKey).count({}, (err, count)=>{
        if (err){
            console.log(err)
        }
        return count;
    })

    if(History_count!=null){
        let resp={
            count: History_count
        }
        console.log(resp)
         res.json(resp)
    }
})
/**
 * @brief Endpoint to add an analysis history record to the DB
 * @param {object} req an object  like this 
 * {
 *  "email": <email>
 *  "log_entries": {
 *      "link":<url>,
 *      "description":<description>,
 *      "log_entry":<error entry>
 *    }
 * }
 * @returns success message as an object
 */
router.post('/', async(req,res)=>{
    try {
        let data = req.body
        const file = new History({
            email:data.email,
            log_entries:data.log_entries
        })

        const newFile = await History.create(file);
        let response ={message:"New History Record Successfully Added!"}
        res.json(response)
        console.log(response)
    } catch (error) {
       handleErrors(error,res)
    }
})

/**
 * @brief Endpoint to retrieve all analysis history linked to a specific user (identified by emal)
 * @returns all the history records linked to a specific user from the database
 */
router.get('/:email', async(req, res)=>{
    try {
        let searckKey={"email":req.params.email}
        const record = await History.find(searckKey)
        console.log(record)
        res.json( record)

    } catch (error) {
        handleErrors(error)
    }
})

/**
 * @brief Endpoint to retrieve a specific analysis history record (identified by url) linked to a specific user (identified by emal)
 * @returns a specific history records linked to a specific user from the database
 */
router.get('/:email/:url', async(req, res)=>{
    try {
        const buff = new Buffer(req.params.url, 'base64');
        const url = buff.toString('ascii');

        let searchKey={
            "email":req.params.email,
            "log_entries.link": url
        }
        const record = await History.find(searchKey)
        console.log(record)
        res.json( record)

    } catch (error) {
        handleErrors(error)
    }
})




module.exports = router;