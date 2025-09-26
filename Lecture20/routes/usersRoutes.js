const express = require("express");
const router = express.Router();
const {m5} = require("../middleware/routerlevel")
router.use(m5)

router.post("/", (req, res) => {
    res.json ({
        success: true,
        message: "user added successfully"
    })
})

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "all users data fetched successfully"
    })
})

router.get("/:id", m5, (req, res) => {
    res.json({
        success: true,
        message: "single user data fetched successfully"
    })
})

module.exports = router