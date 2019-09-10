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
    // createBook()


// function create(){
//     const book = new Book({
//         name:'Ifediwwwli is a boy',
//         author:' Gloria ',
//         datePublished: 14-01-2000,
//         yearPublished: 2019,
//         price: 200
//     })
//     book.save()
// }

// create()

module.exports =  createBook;