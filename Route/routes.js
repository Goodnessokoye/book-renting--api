const _ = require('lodash');
const express = require('express');
const morgan = require('morgan');
const router = express.Router()
const Book = require('../models/books');
const User = require('../models/users');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config")
const {auth, authorization} = require("../middlwares/auth")

router.get('/books', (req,res) =>{
   Book.find({}).then((data) => {
       res.send(data)
       console.log(data)
   })   
   .catch((err) => {
       console.log(err)
   })
})

router.get('/books/:id', (req, res) => {
    Book.findById({_id: req.params.id}, (err, data) => {
        if(err){
          res.send(err)
        }else{
           res.send(data)
        }
    })
})

router.put('/books/:id', (req, res ) => {
    Book.findByIdAndUpdate({_id: req.params.id}, {$set: {name: req.body.name}}, (err, data) => {
        if(err){
            res.send(err)
        }
        else{
            
            res.send(data)
        }
    })
})

router.delete('/books/:id', (req, res) =>{
    Book.findByIdAndRemove({_id: req.params.id}, (err,data) => {
        if(err){
            res.send(err.message)
        }else{
            res.send(data);
        }
    })
})

router.post('/books', (req, res ) => {
    const   book = new Book({  
        id: Book.length + 1,
        name: req.body.name, 
        author: req.body.author,
        datePuslished: req.body.datePuslished,
        yearPublished: req.body.yearPublished,
        price: req.body.price
    })
    book.save(function(err, data){
        if(err){
            console.log(err.message)
        }else{
            console.log(data);
        }
    })
 
})


router.post('/users', (req, res ) => {
  User.findOne({ email: req.body.email}).then(user => {
      if(user){
        return res.status(400).send('user existing already...')
      }
      else{
        const newUser  = new User(
                    {
                        name: req.body.name,
                        email: req.body.email,
                        role: req.body.role,
                        password: req.body.password
            
                });
                    newUser.password =  bcrypt.hash(newUser.password, 10).then((hashedPassword) => {
                        newUser.password = hashedPassword;
                        newUser.save();

                    })
                    const token = jwt.sign({id:newUser._id}, config.get('jwtPrivateKey'));
                    res.header('x-auth-token',token).status(200).send("Sign-up successful");

                } 
            })
});


router.post('/users/login', (req, res) => {
    User.findOne({ email: req.body.email }).then(user =>{
        if(!user){
            res.status(404).send('user not found...check your email or password')
        }
        else{
          bcrypt.compare(req.body.password, user.password).then(isMatch =>{
                if(isMatch){
                    data = {id: user._id, name: user.name, role: user.role}
                    console.log(data)
                  const token = jwt.sign(data, config.get('jwtPrivateKey'), {expiresIn: '30d'})
                  res.send(token)
                }
                else{
                    console.log("not match");
                }
            })
            .catch(err => {
                console.log(err)
            })
        
        }
        
    })
      
})


router.delete('/admin/delete', authorization, (req ,res) =>{
  User.findOneAndDelete({email: req.body.email});
  
})



module.exports = router