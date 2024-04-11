const express = require ("express")
const {registerUser,loginUser} = require("./controllers/userController")
const validateToken = require("./middleware/validateToken")
const connectDb = require("./config/dbConnection")
const dotenv = require("dotenv").config()
const quotes = require("./data/quotes")
// const router = require("./Router/Routes")
const app = express()
connectDb()
app.use(express.json());
app.get("/", (req,res) => {
    res.send("welcome to random quote generator")
})
app.get("/randomquote",validateToken, (req,res) => {
    randomIndex = Math.floor(Math.random() * 20);
    res.status(200).json({
        message: "quote of the day: ",
        data: quotes[randomIndex]
    })
})
app.post("/createUser", registerUser)
app.post("/loginUser",loginUser)
app.listen(8000, () => {
    console.log("app is listening to port 8000")
})