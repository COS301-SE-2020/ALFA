<<<<<<< HEAD
=======
//BY JABULANI SHILI
>>>>>>> 9890ac99e74b20b72adb0b444c76aadd8442f0db
const express = require('express')
const router = express.Router()
const Logfile = require('../models/log_file')
const KB_Article = require('../models/kb_article')
<<<<<<< HEAD

router.get('/retrieve', async(req, res) => {
	try{
		let data = req.body;
=======
const User = require('../model/user');

router.post('/retrieve' async(req, res) => {
	try{
		let data = req.body;

>>>>>>> 9890ac99e74b20b72adb0b444c76aadd8442f0db
		if(data.user_id == null){
			throw '401';
		}
		else{
<<<<<<< HEAD
            let isUser = await User.findByID(data.user_id).exec();
            let limit;
=======
			let isUser = await User.findByID(data.user_id).exec();
>>>>>>> 9890ac99e74b20b72adb0b444c76aadd8442f0db
			if(isUser == null){
				throw '401';
			}
			else{
				if(data.num_retrieve == null){
<<<<<<< HEAD
					limit = 25;
				}
				else{
					limit = data.num_retrieve;
				}
				let logfiles = await Logfile.find({user_id : data.user_id})
					.limit(limit)
					.exec();

				res.status(200).json(logfiles);
=======
					let limit = 25;
				}
				else{
					let limit = data.num_retrieve;
				}
				let logfiles = await Logfile.find(user_id : data.user_id)
					.limit(limit)
					.exec();

				res.status(200)
					.json(logfiles);
>>>>>>> 9890ac99e74b20b72adb0b444c76aadd8442f0db
			}
		}
	}
	catch(error){
		if(error == '401'){
<<<<<<< HEAD
			res.status(401).json({message : 'unauthorised attempt to retrieve logfiles'});
		}
		else{
			res.status(500).json({message : error.message});
=======
			res.status(401)
				.json(message : 'unauthorised attempt to retrieve logfiles');
		}
		else{
			res.status(500)
        		.json(message : error);
>>>>>>> 9890ac99e74b20b72adb0b444c76aadd8442f0db
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
<<<<<<< HEAD
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
=======
>>>>>>> 9890ac99e74b20b72adb0b444c76aadd8442f0db
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