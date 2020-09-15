<<<<<<< HEAD
=======
//BY SHILI JABULANI
>>>>>>> 9890ac99e74b20b72adb0b444c76aadd8442f0db
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
<<<<<<< HEAD
    }, 
=======
    },
>>>>>>> 9890ac99e74b20b72adb0b444c76aadd8442f0db
    user_id:{
        type:String,
        required:false,
    }
})
module.exports = mongo.model("log_files", LogFileSchema)