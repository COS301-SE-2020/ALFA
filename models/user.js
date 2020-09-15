const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email:{
		type: String,
		required: true
	},
	hashedPassword:{
		type: String,
		required: true
	}
	salt:{
		type: String,
		required: true
	}
	/*
	should be either 'normal' or 'data_scientist' or 'admin'
	normal: a standard user with minimal privileges
	data_scientist: a data scientist that should be able to train the ML(not implemented, 15/09/2020)
	admin: the only user that can create data scientists and other admins
	*/
	user_type:{
		type: String,
		required: true,
		default: 'normal'
	}
});

module.exports = mongoose.model('user', UserSchema);