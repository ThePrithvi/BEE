const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.post("/data", (req, res) => {
    const data = req.body;
        console.log("data sent", data);
        res.send("Data received successfully!");
});

app.listen(3000, () => {
    console.log("Server is running");
});