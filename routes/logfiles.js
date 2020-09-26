const express = require('express')
const router = express.Router()
const Logfile = require('../models/log_file')
const KB_Article = require('../models/kb_article')

router.get('/retrieve/:userId/:limit', async(req, res) => {
	try{
		let data = req.params;
        let isUser = await User.findByID(data.userId)
        	.exec();
        let limit;
		if(isUser == null){
			throw '401';
		}
		else{
			limit = data.limit;
			let logfiles = await Logfile.find({user_id : data.user_id})
				.limit(limit)
				.exec();
				res.status(200).json(logfiles);
		}
	}
	catch(error){
		if(error == '401'){
			res.status(401).json({message : 'unauthorised attempt to retrieve logfiles'});
		}
		else{
			res.status(500).json({message : error.message});
        }
	}
});

//Endpoint to save uploded file contents to db
router.post('/upload', async(req,res)=>{
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
            content: data.content,
            user_id: data.user_id
        })

        const newFile = await file.save()
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