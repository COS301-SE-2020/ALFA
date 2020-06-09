var express = require('express')
const mongo = require('mongoose')
const parser = require('body-parser')
require('dotenv/config')

//FOR DB CONNECTION
mongo.connect(
    process.env.DB_CONNECTION,
    { 
        useUnifiedTopology: true,  
        useNewUrlParser: true  
    },
    ()=> console.log("DB connection successful")
)

//MIDDLEWARE
app = express()
app.use(parser.json())


app.listen(2221,()=>{
    console.log("Server Running on localhost:2221")
})