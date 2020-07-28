//BY Pako Diale
const mongoose = require('mongoose')
const KBArticleSchema = mongoose.Schema({
	kb_index:{
		type: Number,
		unique: true
	},
    description: {
        type: String,
        required: true
    },
	link: {
		type: String,
        required: true,
        unique: true,
	},
});

module.exports = mongoose.model('kb_articles', KBArticleSchema)
