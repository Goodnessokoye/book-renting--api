const mongoose = require('mongoose');
// const books = require('./models/books')
// const create = require('./helpers/createNewBook');

function initDb(){
    mongoose.connect("mongodb://127.0.0.1:27017/Book-Shop", { useNewUrlParser: true, useCreateIndex: true },
     function (error){
        if(error){
            console.log('Not connected to Database...');
        }else{
            console.log('Connected to Database...');
        }
    }
)};




module.exports = initDb;