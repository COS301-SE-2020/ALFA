var express = require('express')
const mongo = require('mongoose')
const parser = require('body-parser')
const articleRoute = require('./routes/articles')
const logFileRoute = require('./routes/logfiles')
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
app.use('/articles',articleRoute)
app.use('/logfiles',logFileRoute)

app.get('/', (req, res)=>{
    res.send("API IS Running")
})
//listening to incoming connections
const PORT = process.env.PORT || 2221;
app.listen(PORT,()=>{
    console.log(`Server Running on localhost:${PORT}`)
})
