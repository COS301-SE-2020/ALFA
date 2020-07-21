var express = require('express')
const app = express()
const mongo = require('mongoose')
const parser = require('body-parser')
const articleRoute = require('./routes/articles')
const logFileRoute = require('./routes/logfiles')
require('dotenv/config')

//FOR DB CONNECTION
/**
 * localhost db connection
 * make sure mongo is running locally to use this connection method
 */
/* const db = "mongodb://localhost:27017/alfa_db";
mongo.connect(
    db,
    { 
        useUnifiedTopology: true,  
        useNewUrlParser: true  
    },
    ()=> console.log("Local DB connection successful")
) */

// allow requests from different origin
app.use(function(req, res, next){
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // for localhost
    res.header("Access-Control-Allow-Origin", "https://alfa-automated-log-analyzer.web.app/"); // for production/deployed
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
})


/**
 * production db connection
 */
mongo.connect(
    process.env.DB_CONNECTION,
    { 
        useUnifiedTopology: true,  
        useNewUrlParser: true  
    },
    ()=> console.log("Product DB connection successful")
)

//MIDDLEWARE
app.use(parser.json())
app.use('/articles',articleRoute)
app.use('/logfiles',logFileRoute)

app.get('/', (req, res)=>{
    res.send("API IS Running")
})
//listening to incoming connections
const PORT = process.env.PORT || 8090;
app.listen(PORT,()=>{
    console.log(`Server Running on localhost:${PORT}`)
})
