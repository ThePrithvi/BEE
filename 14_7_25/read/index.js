const fs = require("fs");

fs.readFile("../demo.txt", "utf-8", function (err, data1) {
    if (err) return console.log(err);
    // console.log(data1); 
    fs.readFile("../demo2.txt", "utf-8", function (err, data2) {
        if (err) return console.log("error in second file");
        fs.writeFile("./result.txt", data1 + "\n" + data2, function (err) {
            if (err) console.log(err);
            console.log("done");
        })
    })
})

// Assignment(10 marks): Part:1 Do in BEE(main) folder. 
// Create main folder "Assignment" and make a series of assigment in this folder 
// write data in file using fs module,
// input data should be taken using terminal. (You can google this part)


console.log(process.argv[3]); // terminal ka input iske andar se likha jaata hai