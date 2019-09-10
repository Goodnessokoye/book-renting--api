const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const databaseConfig = require('./config/db');
const bodyParser = require('body-parser')
const createNewBook = require('./helpers/createNewBook');

const app = express();

const Book = require('./models/books');
const routes = require("./Route/routes")




app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use('/api', routes)

// app.get('/', (req, res) =>{
//     Book.find({}).then((data) => {
//         res.send(data)
//         console.log(data)
//     })   
//     .catch((err) => {
//         console.log(err)
//     })
//  })


const port = process.env.Port || 5000
app.listen(port, () =>{
    console.log(`server is running ${port}`)
    databaseConfig();
})