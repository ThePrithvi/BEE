const jwt = require("jsonwebtoken");
function isLogin (req, res, next) {
    if (!req.headers.authorization) (
        res.json ({
            success: false,
            message: "no authorization"
        })
    )
    let token = req.headers.authorization;
    if (!token) {
        return res.json ({
            success: false,
            message: "Please login"
        });
    }

    const decode = jwt.verify(token, "blogs");
    if(!decode) {
        return res.json ({
            success: false,
            message: "Invalid token"
        })
    }
    req.userId = decode.userId;
    next();
}

module.exports = { isLogin };