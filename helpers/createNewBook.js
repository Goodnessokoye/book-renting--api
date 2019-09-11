const mongoose = require('mongoose');
const Book = require('../models/books');



    async function createBook(){
        const book = new Book({
            name:'Obi is an Intellegent boy',
            author:' Chisom ',
            datePublished: 16-04-2019,
            yearPublished: 2019,
            price: 100
        })
        const result = await book.save();
        console.log(result);
    }

module.exports =  createBook;