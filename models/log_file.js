//BY SHILI JABULANI
const mongo = require('mongoose')
const LogFileSchema = mongo.Schema({
    filename:{
        type:String,
        required:true,
        default:"ALFA Auto Generated LogFile",
    },
    date:{
        type:String,
        required:true,
    },
    content:{
        type: String,
        required: true,
        unique: true,
    }
})
module.exports = mongo.model("log_files", LogFileSchema)