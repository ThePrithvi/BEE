const express = require('express');
const fs = reqire('fs');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json()); //Parse JSON bodies
app.use(express.urlencoded({extended: true}));

//Get all users
app.get('/', (req, res) => {
    res.send("server new");
})
app.get('/users', (req, res) => {
    fs.readFile("users.json", "utf-8", (err,data) => {
        if (err) {
            console.log(err);
            return;
        }
        let allusers = JSON.parse(data);
        res.json(allusers);
    })
})
app.post("/adduser", (req, res) => {
    try {
        let name = req.body.name;
        let username = req.body.username;
        let newuser = {
            id: Math.floor(Math.random() * 1000000),
            name: name;
            username: username;
            role: "user"
        }
        let alluser = [];
        let data = fs.readFileSync("user.sync", "utf-8");
        if (data) {
            alluser = JSON.parse(data);
        }
        alluser.push(newuser)
        fs.writeFileSync("users.json",JSON.stringify(alluser));
        // res.send("user added successfully");
        res.json({
            success:true,
            data:allusers;
        })
    }
    catch (error);
})