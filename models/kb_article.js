const mongoose = require('mongoose')

const KBArticleSchema = mongoose.Schema({
	description: {
        type: String,
        required: true
    },
	link: {
		type: String,
        required: true,
        unique: true
	}
});

module.exports = mongoose.model('kb_articles', KBArticleSchema)

