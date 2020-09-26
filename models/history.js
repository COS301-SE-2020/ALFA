const mongoose = require('mongoose')

const SuggestionSchema = mongoose.Schema({
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

const AnalysisSchema = mongoose.Schema({
    kb_index:{
        type: Number,
		required: true,
		unique: true
    },
    suggestions:[SuggestionSchema],  
    line_no:{
        type: Number,
    },
    log_entry:{
	    type: String,
        required: true,
    },
})

const HistorySchema = mongoose.Schema({
    user_id:{
    	type: String,
    	required: true,
    },
    save_date:{
        type: String,
        required: true,
    },
    save_time:{
	    type: String,
        required: true,
    },
    analysis_data:[AnalysisSchema],
})

module.exports = mongoose.model('analysis_history', HistorySchema)
