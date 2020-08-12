//BY Pako Diale
const mongoose = require('mongoose')

const suggestionSchema = mongoose.Schema({
	//tried to manually handle indices
	sug_index:{
		type: Number,
		required: true
	},
	votes:{
		type: Number,
		required: true
	},
	description: {
        type: String,
        required: true
    },
	link: {
		type: String,
        required: true,
        unique: true
	},
})

const KBArticleSchema = mongoose.Schema({
	kb_index:{
		type: Number,
		required: true,
		unique: true
	},
	suggestions:[suggestionSchema],  
});

module.exports = mongoose.model('kb_articles', KBArticleSchema)

