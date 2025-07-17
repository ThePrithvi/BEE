const fs = require("fs");

fs.writeFile("../demo2.txt", "g26 hello", function(err){
    if(err) return console.log(err);
    console.log("success!!1");
})