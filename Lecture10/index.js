const express = require("express");
const app = express();

app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname+"/about.html");
});

app.post("/users", (req, res) => {
    let username=req.body.username;
    let password=req.body.password;
    res.json({
        username,
        password
    })
})
app.listen(3000, () => {
    console.log("We have reached Lecture 10? already?!");
})