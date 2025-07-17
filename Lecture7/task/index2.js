const fs = require("fs");

fs.readFile("../users.txt", "utf-8", function (err, data1) {
    if (err) console.log(err);
    let users1 = JSON.parse(data1);

    fs.readFile("../users2.txt", "utf-8", function (err, data2) {
        if (err) return console.log(err);
        let users2 = JSON.parse(data2);

        let allusers = users1.concat(users2);
        fs.writeFile("../allusers.txt", JSON.stringify(allusers), function(err, data){
            if(err) console.log(err);
            console.log("all users written");
        })
    })
})

// assignment2: ask someone smart