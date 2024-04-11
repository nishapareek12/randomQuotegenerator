const User = require("../models/userModel")
const asynchandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const registerUser = asynchandler(async(req, res) => {
   const {username, email, password } = req.body;
   if(!username || !email || !password){
    res.status(400)
    throw new Error("All fields are mandatory")
   }else{
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        throw new Error("user already exists")
    }else{
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password : hashedPassword
        })
        if(user){
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email
            })
            }else{
                throw new Error("unable to create user")
            }
    }
   }
})

const loginUser = asynchandler(async (req,res) => {
 const {email, password} = req.body
 if(!email || !password){
    res.status(400)
    throw new Error("please enter required data!")
 }else{
    const user = await User.findOne({email})
    if(user && bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({user: {
            username: user.username,
            email:user.email,
            _id: user.id
        }}, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        res.status(200).json({
            accessToken
        })
    }else{
        res.status(400).json({
            message: "unable to login"
        })
    }
    
 }
})

const currentUser = asynchandler(async (req,res) => {
    res.json(req.user);
})
module.exports = {registerUser, loginUser, currentUser}