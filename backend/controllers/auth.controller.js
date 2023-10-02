const { User } = require('../models/user.model.js')
const mongoose = require('mongoose');
const bycrpt = require('bcryptjs');
const createAccessToken = require('../libs/jwt.js');

const register = async (req, res) => {
    const { email, password, username } = req.body

    try {

        const passwordHash = await bycrpt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash

        })
        console.log(newUser)
        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie("token", token);
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        });
    } catch (error) {
      res.status(500).json({message: error.message})
    }

};

const login = async (req, res) => {
    const { email, password} = req.body

    try {
        const userFound = await User.findOne({email})

        if (!userFound) return res.status(400).json({message:"User not found"})

        const isMatch = await bycrpt.compare(password, userFound.password)

        if(!isMatch) return res.status(400).json({message:"Incorrect Password"})

        const token = await createAccessToken({ id: userFound._id });

        res.cookie("token", token);
        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        });
    } catch (error) {
      res.status(500).json({message: error.message})
    }

};

const logout = async (req,res) =>{
res.cookie("token","",{
    expires: new Date(0)
})
return res.sendStatus(200)
};

const profile = async(req,res) =>{
const userFound = User.findById(req.user.id);
if(!userFound) return res.status(400).json({message:"User not found"});

return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updateAt,
}) 
res.send("profile")
}


module.exports = { register, login, logout, profile }