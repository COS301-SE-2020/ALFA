const mongoose = require('mongoose')

const LogEntriesSchema = mongoose.Schema({
	log_entry:{
		type: String,
		required: true
	},
	description: {
        type: String,
        required: true
    },
	link: {
		type: String,
        required: true
    },
    votes:{
        type:Number,
        required: true
    }
})

const HistorySchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    log_entries:[LogEntriesSchema],
})

module.exports = mongoose.model('analysis_history', HistorySchema)
