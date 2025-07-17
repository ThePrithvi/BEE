const fs = require("fs");

fs.writeFile("../demo3.txt", "From Demo 3", function(err, data){
    if(err) return console.log(err);
    console.log("success!!");
})

fs.writeFile("../demo4.txt", "From Demo 4", function(err, data){
    if(err) return console.log(err);
    console.log("success!!");
})

let variable = "";

fs.readFile("../demo3.txt", "utf-8", function(err, data){
    if(err) return console.log(err);
    variable+=data+"\n";
    fs.readFile("../demo4.txt", "utf-8", function(err, data){
        if(err) return console.log(err);
        variable+=data;

        fs.writeFile("../finalDemo.txt", variable, function(err, data){
            if(err) return console.log(err);
            console.log("success!!");
        })
    })
})