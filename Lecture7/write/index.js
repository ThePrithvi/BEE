let users = [
    {
        name:"Nitish",
        age:"24",
        address:"Delhi",
    }
    ,{
        name:"Ritik",
        age:"25",
        address:"Delhi",
    }
]

const fs = require("fs")
fs.writeFile("../users.txt", JSON.stringify(users), function(err){
    if(err) return console.log(err);
    console.log("Users data written to file successfully");
})