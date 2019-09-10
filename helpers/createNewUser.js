const mongoose = require('mongoose');
const User = require('../models/users');



    async function createUser(){
        const user = new User({
            name:'Loveth',
            email:' Chisom@gmail',
           dateOfBirth: 1996,
           password: '',
        })
        const result = await user.save();
        console.log(result);
    }

    module.exports =  createUser;