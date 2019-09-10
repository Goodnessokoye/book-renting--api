const mongoose = require('mongoose');
const schema = mongoose.Schema;
// const create = require('./helpers/createNewBook');


const bookSchema = schema({
    name: {type: String, required: true },
    author: { type: String, required: true},
    datePuslished:{type: Date, required: true},
    yearPublished: {type: Number, required: true},
    price: { type: Number, required: function () { return this.yearPuslished}},
    date: { type: Date, default: Date.now()}

})

module.exports = mongoose.model('books', bookSchema);