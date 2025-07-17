const fs = require("fs");

fs.writeFile("../demo.txt", "g26 hello", function(err, data){
    if(err) return console.log(err);
    console.log("success!!");
})

fs.writeFile("../demo2.txt", "Hello Prithvi Thakur", function(err, data){
    if(err) return console.log(err);
    console.log("success!!");
})