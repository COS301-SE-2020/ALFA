const mongoose = require('mongoose')
const KBArticleSchema = mongoose.Schema({
	link: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('kb_articles', KBArticleSchema)
