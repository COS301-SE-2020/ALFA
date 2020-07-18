//BY JABULANI SHILI
const express = require('express')
const router = express.Router()
const Logfile = require('../models/log_file')
const KB_Article = require('../models/kb_article')

//Endpoint to save uploded file contents to db
router.post('/', async(req,res)=>{
    try {
        let data = req.body

        let currentDate = new Date();
        let dateFormat = new Intl.DateTimeFormat(
            'en',
            {
                year: 'numeric',
                month:'2-digit',
                day: '2-digit',
            }
        ).format(currentDate);

        const file = new Logfile({
            filename: data.filename,
            date: dateFormat,
            content: data.content
        })

        const newFile = await file.save()
        // res.json(newFile)
        if(newFile){
            /**
             * Calls to the AI API should be done here
             * for now, a random number of documents is returned
             */

            try{
                let limit = 3;
                let results = await getAnalysisResults(limit)
                console.log(results);
                res.json(results);
            }catch(error){
                res.json( {message: error} );
            }
        }
        // console.log(newFile)
    } catch (error) {
        if(error.code == '11000'){
            /**
             * found a duplicate logfile, analyze the file in the database and return the results
             */
            try{
                let limit = 3;
                let results = await getAnalysisResults(limit)
                console.log(results);
                res.json(results);
            }catch(error){
                res.json( {message: error} );
            }
        }else{
            console.log(error)
            res.json({message:error});
        }
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
        res.json({message: error})
    }
})

/**
 * helper functions
 */
/**
 * @brief function gets random articles and returns them
 * @param {int} limit specifies the number of documents to return
 */
async function getAnalysisResults(limit){
    try{
        // const limitedArticles = await KB_Article.find().sort({_id: 1}).limit(limit);
        let limitedArticles = await KB_Article.aggregate( [
            { $sample: {size: limit} }
        ]);

        console.log("New Record Saved!")
        console.log(`Returning ${limit} articles`);
        return limitedArticles;
    }catch(error){
        // console.log(error);
        // res.json({message: error});
        return {message: error};
    }
}
module.exports = router