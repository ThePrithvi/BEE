const express = require("express");
const {m1, m2} = require("./middleware/firstmiddleware")
const {m3} = require("")
const app = express();
const userRouter = require("./routes/usersRoutes")
app.use(express.static(__dirname+"/public"))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(m1)
// app.use(m2)
app.use("/api/users", userRouter)
app.get("/health", m3, (req, res) => {
    console.log("running controller function")
    // next()
    res.json({
        status: "ok",
        message: "server running ok"
    })

    console.log("after response")
})

app.use(m2)
app.get("/home", (req, res, next) => {
    console.log("running home endpoint...");
    res.json({
        success: true,
        message: "Welcome to Home Page"
    })
})


app.listen(5775, () => {
    console.log("server started");
})

