const fs = require("fs");

fs.readFile("../users2.txt", "utf-8", function(err, data){
    if(err) return console.log(err);
    let users = JSON.parse(data2);
    console.log(users[0].name);
})