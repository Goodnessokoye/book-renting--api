const bookModel = require('./models/books');
const create = require('./helpers/createNewBook');

const addBook = function(){
    const newBook = new bookModel(
        {
            name: userData.name,
            author: userData.author,
            datePublished: userData.datePublished,
            yearPublished: userData.yearPublished,
            price: userData.price

    });
    console.log(create())

    return newBook.save();
}

module.exports.addBook = addBook;