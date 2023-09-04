const {User} = require('../models/user.model.js')
const mongoose =require('mongoose');
const register = (req, res) => {
    const {email,password,username} = req.body
    const newUser = new User({
        username,
        email,
        password

    })
    console.log(newUser)
    newUser.save  ()

res.send("registrando")
};

 const login = (req,res ) => {
res.send("login")
};

module.exports ={register,login}