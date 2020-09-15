const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const HASH_ROUNDS = 15;

//endpoint for logging in users
router.post('/login', async(req, res) => {
	try{
		let data = req.body;
		let potentialLogin = await User.findOne({email : data.email})
			.exec();
		if(potentialLogin == null){
			throw '400';
		}
		else{
			let saltedPass = data.password.concat(potentialLogin.salt);
			let hashedSaltedPass = bcrypt.hashSync(saltedPass, HASH_ROUNDS);
			if(potentialLogin.hashedPassword != hashedSaltedPass){
				throw '400';
			}
			else{
				res.status(200).json({
                	message : 'login successful',
                	user_id : potentialLogin._id
                });
			}
		}
	}
	catch(error){
		if(error == '400'){
			res.status(400)
				.json(message : 'invalid login credentials');
		}
		else{
			res.status(500)
				.json({message : error});
		}
	}
});

//endpoint for registering users
router.post('/register', async(req, res) =>{
	try{
		let data = req.body;

		let existing = await User.find(email : data.email)
			.countDocuments()
			.exec();

		if(existing != 0){
			res.status(200)
				.json({message : 'email already in use'});
		}
		else{
			/*do{
			let salt = Math.random();
			salt = await bcrypt.hash(salt.toString(), 1);
			let numSimilar = await User.where('salt').equals(salt).countDocuments();
			}while(numSimilar != 0)*/
			salt = bcrypt.genSaltSync(HASH_ROUNDS);
			let saltedPass = data.password.concat(salt);
			let hashedSaltedPass = bcrypt.hashSync(saltedPass, HASH_ROUNDS)

			const newUser = new User({
				email: data.email,
				password: hashedSaltedPassword,
				salt: salt
			});

			let savedUser = await newUser.save();
			if(savedUser){
				res.status(200)
					.json({message : 'user registered'});
			}
			else{
				throw 'error saving user data';
			}
		}
	}
	catch(error){
		res.status(500)
			.json(message : error);
	}
});

module.exports = router;