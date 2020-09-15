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
});

module.exports = mongoose.model('user', UserSchema);