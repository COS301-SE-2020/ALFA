const mongoose = require('mongoose')

const counterSchema = mongoose.Schema({
    sequence_value:{
        type: Number,
        unique:true,
        required: true
    },
    key:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('counter', counterSchema)
