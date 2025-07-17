const fs = require("fs");

process.stdout.write("Enter your data: ");

process.stdin.on("data", function(data){
    const input = data.toString().trim();

    fs.writeFile("../demo.txt", input, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("success!");
        }
    });
});