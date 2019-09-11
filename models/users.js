const mongoose = require('mongoose');
const schema = mongoose.schema; 

const userSchema = mongoose.Schema({
    name: {type : String, required: true},
    email: { type: String, required: true, unique: true},
    role: {type: String},
    password: { type: String, required: true}
    
})
        userSchema.method.generateAuthToken = function(){
        const token = jwt.sign({id: this._id, role: this.role}, config.get('Goodness'));
        return token;
        }


module.exports = mongoose.model('users', userSchema);