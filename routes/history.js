const express = require('express')
const router = express.Router()
const History = require('../models/history')
const MongoClient = require('mongodb').MongoClient;

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
 * @brief Endpoint to add an analysis history record to the DB
 * @param {object} req an object that contains 
 *                  e.i description and link [old]
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
 * @brief Endpoint to retrieve all analysis history  [old & hacked]
 * @returns all the history records ever stored in the database
 */
router.get('/:email', async(req, res)=>{
    try {
        // let Histories =[];
        // MongoClient.connect(process.env.DB_CONNECTION, async(error, client)=>{
        //     if(error){
        //         handleErrors(error, res);
        //     }
        //     Histories = await client.db('ALFA_DB').collection('analysis_history').find().toArray()
        //     console.log("Data recieved!")
        //     res.json( Histories)
        // })
        
    } catch (error) {
        handleErrors(error)
    }
})

router.get('/history/:email/:url')

module.exports = router;