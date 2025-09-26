const app = express();
const fs = require("fs");
app.use(express.static(__dirname+"/public"));
app.get("/", (req, res) => {
    res.send("server started");
})

app.get("users", (req, res) => {
    fs.readFile("./users.json", "utf-8", function(err, data) {
        if (err) res.send(err);
        let allUsers = JSON.parse(data);
        res.json(allUsers);
    })
})
app.listen(3000, () => {
    console.log("Server started ");
})