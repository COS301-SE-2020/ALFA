const mongoose = require('mongoose')

const suggestionSchema = mongoose.Schema({
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
	suggestion: suggestionSchema,
});

module.exports = mongoose.model('kb_articles', KBArticleSchema)

