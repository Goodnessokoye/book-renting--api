const _ = require('lodash');
const express = require('express');
const morgan = require('morgan');
const router = express.Router()
const Book = require('../models/books');
const User = require('../models/users');
const addUser = require('../services/userServices')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    book.save(function(err, post){
        if(err){
            console.log(err.message)
        }else{
            console.log(post);
        }
    })
    // res.send(book);
})


router.post('/users', (req, res ) => {
  User.findOne({ email: req.body.email}).then(user => {
      if(user){
        //   console.log(user)
        return res.status(400).send('user existing already...')
      }
      else{
        const newUser  = new User(
                    {
                        name: req.body.name,
                        email: req.body.email,
                        dateOfBirth: req.body.dateOfBirth,
                        password: req.body.password
            
                });
                    // const salt = await bcrypt.genSalt(10); 
                    newUser.password =  bcrypt.hash(newUser.password, 10).then((hashedPassword) => {
                        newUser.password = hashedPassword;
                        // console.log(hashedPassword)
                        newUser.save();

                    })

                    res.send("Added");

                } 
            })
            // _.pick(user, ['_id','name','email'])
            
                //instead of using this we use the lodash method
            // name: req.body.name,
            // email: req.body.email
    
   

});


router.post('/users/login', async (req, res) => {
    User.findOne({ email: req.body.email }).then(user =>{
        // console.log(user)
        if(!user){
            res.status(404).send('user not found...check your email or password')
        }
        else{
            console.log(req.body.password)
          bcrypt.compare(req.body.password, user.password).then(isMatch =>{
                if(isMatch){
                    data = {id: user._id, name: user.name}
                    console.log(data)
                  const token = jwt.sign(data, "Godness", {expiresIn: '100d'})
                  res.send(token)
                }
                else{
                    console.log("not match");
                }
            })
            .catch(err => {
                console.log(err)
            })
           // console.log(validPassword)
            // if(!validPassword){

        }
        
    })
      
    //     res.status(404).send('invalid password')
    //     res.send(true);
    // }
})

module.exports = router