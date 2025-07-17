let users = [
    {
        name:"Prithvi",
        age:"24",
        address:"Delhi",
    }
]

const fs = require("fs")
fs.writeFile("../users2.txt", JSON.stringify(users), function(err){
    if(err) return console.log(err);
    console.log("Users data written to file successfully");
})