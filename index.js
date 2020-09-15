var express = require('express')
const app = express()
const mongo = require('mongoose')
const parser = require('body-parser')
const articleRoute = require('./routes/articles')
const logFileRoute = require('./routes/logfiles')
<<<<<<< HEAD
const userRoute = require('./routes/users')
=======
const userRoute = require('./routes/user');
>>>>>>> 9890ac99e74b20b72adb0b444c76aadd8442f0db
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
    res.header("Access-Control-Allow-Origin", "*");
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
        useNewUrlParser: true,
        useFindAndModify: false  
    },
    ()=> console.log("Product DB connection successful")
)

//MIDDLEWARE
app.use(parser.json())
app.use('/articles',articleRoute)
app.use('/logfiles',logFileRoute)
<<<<<<< HEAD
app.use('/users',userRoute)
=======
app.use('/user',userRoute);
>>>>>>> 9890ac99e74b20b72adb0b444c76aadd8442f0db

app.get('/', (req, res)=>{
    res.send("API IS Running")
})
//listening to incoming connections
<<<<<<< HEAD
const PORT = process.env.PORT || 9090;
=======
const PORT = process.env.PORT || 8090;
>>>>>>> 9890ac99e74b20b72adb0b444c76aadd8442f0db
app.listen(PORT,()=>{
    console.log(`Server Running on localhost:${PORT}`)
})
