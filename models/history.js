const mongoose = require('mongoose')

// const SuggestionSchema = mongoose.Schema({
// 	votes:{
// 		type: Number,
// 		required: true
// 	},
// 	description: {
//         type: String,
//         required: true
//     },
// 	link: {
// 		type: String,
//         required: true,
//         unique: true
// 	},
// })

// const AnalysisSchema = mongoose.Schema({
//     kb_index:{
//         type: Number,
// 		required: true,
// 		unique: true
//     },
//     suggestions:[SuggestionSchema],  
//     line_no:{
//         type: Number,
//     },
//     log_entry:{
// 	    type: String,
//         required: true,
//     },
// })

/**
 * {
 *  "email": <email>
 *  "log_entries": <analysisResults[]>
 * }
 */


const LogEntrySchema = mongoose.Schema({
    description:{
        type: String,
		required: true
    },
    link:{
        type: String,
        required: true,
        unique: true
    },
    log_entry:{
	    type: String,
        required: true,
    },
})

const HistorySchema = mongoose.Schema({
    email:{
	    type: String,
        required: true,
    },
    log_entries:[LogEntrySchema],

})

module.exports = mongoose.model('analysis_history', HistorySchema)
