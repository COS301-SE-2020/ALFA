const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const HASH_ROUNDS = 15;
/**
 * @brief endpoint to authenticate user login credentials
 * @param req which is a user object with just the email and password
 */

// Endpoint for changing the email of a user
router.post('/changeEmail', async(req, res) => {
	try{
		let data = req.body;

		let potentialChange = await User.findOne({_id : data.user_id})
			.exec;
		if(potentialLogin == null){
			throw 'ERROR: User does not exist';
		}
		else{
			User.findOneAndUpdate({_id : data.user_id}
				,{email : data.new_email})
				.exec();
		}
	} catch (error) {
		res.status(200).json({message : error});
		console.log(error);
	}
});



router.post('/login', async(req, res) => {
	try{
		let data = req.body;
		let potentialLogin = await User.findOne({email : data.email})
			.exec();
		if(potentialLogin == null){
			throw 'ERROR: User does not exist!';
		}
		else{
			let saltedPass = data.password.concat(potentialLogin.salt);
			let hashedSaltedPass = bcrypt.hashSync(saltedPass, HASH_ROUNDS);

			if(bcrypt.compareSync(saltedPass, potentialLogin.hashedPassword) ){
				res.status(200).json({
                	message : 'login successful',
                	user_id : potentialLogin._id
                });				
			}
			else{
				throw 'ERROR: Invalid password provided!';
			}
		}
	}
	catch(error){
		res.status(200).json({message : error});
		console.log(error)
	}
});


/**
 * @brief endpoint for registering users from Angular form
 * @param req which is a user object with fullname, email and password
 */
router.post('/register', async(req, res) =>{
	try{

		let data = req.body;

		let existing = await User.find({email : data.email})
			.countDocuments()
			.exec();

		if(existing != 0){
			res.status(200).json({message : 'email already in use'});
		}
		else{
		
			salt_ = bcrypt.genSaltSync(HASH_ROUNDS);
			let saltedPass = data.password.concat(salt_);
			let hashedSaltedPass = bcrypt.hashSync(saltedPass, HASH_ROUNDS)

			const newUser = new User({
				fullname: data.fullname,
				email: data.email,
				hashedPassword: hashedSaltedPass,
				salt: salt_,
				user_type:'normal'
			});

			let savedUser = await newUser.save();
			if(savedUser){
				res.status(200)
					.json({message : 'New User Registered!'});
			}
			else{
				throw 'error saving user data';
			}
		}
	}
	catch(error){
		res.status(200).json({message : error.message});
		console.log(error.message)
	}
});

//endpoint for registering users from Admin side
router.post('/registerUser', async(req, res) =>{
	try{
		let data = req.body;

		let existing = await User.find({email : data.email})
			.countDocuments()
			.exec();

		if(existing != 0){
			res.status(200).json({message : 'email already in use'});
		}
		else{
			salt_ = bcrypt.genSaltSync(HASH_ROUNDS);
			let saltedPass = data.password.concat(salt);
			let hashedSaltedPass = bcrypt.hashSync(saltedPass, HASH_ROUNDS)

			const newUser = new User({
				email: data.email,
				password: hashedSaltedPassword,
                salt: salt_,
                user_type: data.user_type
			});

			let savedUser = await newUser.save();
			if(savedUser){
				res.status(200).json({message : 'user registered'});
			}
			else{
				throw 'error saving user data';
			}
		}
	}
	catch(error){
		res.json({message : error}).status(500);
		console.error(error);
	}
});
module.exports = router;