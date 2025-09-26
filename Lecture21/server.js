const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./model/users");
const { error } = require("console");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "server running"
    })
})

//signUp
app.post("/api/user/signUp", async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let userExists = await User.finance({ email: email });
        if ( userExists ) {
            return res.json({
                success: false,
                message: "User already exists with this email please login"
            })
        }

        let newUser = new User({
            name: name,
            email: email,
            password: password
        })
        await newUser.save();

        res.json({
            success: true,
            message: "User registered successfully please login to continue"
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            error: {
                message: error.message
            }
        })
    }
})

app.post("/api/auth/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let userExist = await User.findOne({ email: email });
        if (!userExist.password) {
            return res.json({
                success: false,
                message: "user doesn't exist. Please Sign Up"
            })
        }
        if (userExist.password != password) {
            return res.json({
                success: false,
                message: "Invalid password"
            })
        }
        if (userExist.password == password) {
            return res.json({
                success: true,
                message: "login successfully"
            })
        }
    } catch (error) {
        console.log(error.message);
        res.json({
            error: {
                message: error.message
            }
        })
    }
})

app.listen(3000, () => {
    console.log("Server Started");
});

mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
.then(() => console.log('Connected'));