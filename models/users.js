const mongoose = require('mongoose');
const schema = mongoose.schema; 

const userSchema = ({
    name: {type : String, required: true},
    email: { type: String, required: true, unique: true},
    dateOfBirth: { type: Number, required: true},
    password: { type: String, required: true}
})


module.exports = mongoose.model('users', userSchema);