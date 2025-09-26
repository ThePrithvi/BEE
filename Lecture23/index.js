// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const Blogs = require("./model/blog")
// const Users = require("./model/user");
// const user = require("./model/user");

// //adding a blog to database
// app.post("/blogs", async (req, res) => {
//     let { title, body, userId } = req.body;
//     let userExist = await user.findById(userId);
//     if (userExist) {
//         let newBlog = new Blogs({
//             title: title,
//             body: body,
//             date: Date.now(),
//             userId: userId
//         })
//         await newBlog.save()
//         userExist.blogs.push(newBlog._id)
//         await userExist.save();
//         res.json({
//             success: true,
//             data: newBlog,
//             message: "blog added successfully!!!"
//         })
//     }
// })

// //getting single blog
// app.get("/blogs/:id", async (req, res) => {
//     let { id } = req.params
//     let blog = await Blogs.findOne({ _id: id });
//     res.json({
//         success: true,
//         data: blog
//     })
// })


// app.post("/users", async (req, res) => {
//     let { email, username, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     let newUser = new Users({
//         email: email,
//         username: username,
//         password: hashedPassword
//     });
//     await newUser.save();
//     res.json({
//         success: true,
//         data: newUser,
//         message: "user added successfully!!!"
//     });
// });

// app.post("/users", async (req, res) => {
//     let { email, password } = req.body;

//     //check if user exists
//     let userExist = await Users.findOne({ email: email });
//     if (!userExist) {
//         return res.json ({
//             success: false,
//             message: "User not found"
//         });
//     }

//     //check password
//     const validPassword = await bcrypt.compare(password, userExist.password);
//     if (!validPassword) {
//         return res.json ({
//             success: false,
//             message: "Invalid password"
//         });
//     }

//     //create jwt token
//     const token = jwt.sign(
//         { userId: userExist._id },
//         "secret123",
//         { expiresIn: "1h"}
//     );

//     res.json({
//         success: true,
//         message: "Login successful",
//         token: token
//     });
// });

// app.get("/users", async (req, res) => {
//     let allUsers = await Users.find();
//     res.json({
//         success: true,
//         data: allUsers
//     });
// });

// app.get("/users/:id", async (req, res) => {
//     let { id } = req.params;
//     let userExist = await Users.findOne({ _id: id }).populate("blogs");
//     if (userExist) {
//         res.json({
//             success: true,
//             data: userExist
//         });
//     }
// });

// //delete block
// app.delete("/blogs/:blogId", async (req, res) => {
//     let { blogId } = req.params;
//     let { userId } = req.body;
//     let blogExist = await Blogs.findById(blogId);
//     if (!blogExist) return res.json({
//         success: false,
//         message: "Blog doesn't exist"
//     })
//     if (blogExist.userId.toString() !== userId) return res.json({
//         success: false,
//         message: "You are not allowed to delete this blog"
//     })
//     await Blogs.findByIdAndDelete(blogId);
//     let userExist = await user.findById(userId);
//     let blog = userExist.blogs.filter((id) => id !== blogId)
//     userExist.blogs = blog
//     await userExist.save();
//     res.json({
//         success: true,
//         message: "blog deleted successfully",
//         data: userExist
//     })
// })

// app.listen(4455, () => {
//     console.log("Server started");
// })
//     +
//     mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
//         .then(() =>
//             console.log('Connected!'));

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const Blogs = require("./model/blog");
// const Users = require("./model/user");

// function isLogin(req, res, next) {
//     const token = req.headers["authorization"];

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Access denied. No token provided"
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, "secret123");
//         req.userId = decoded.userId;
//         next();
//     } catch (err) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid token"
//         });
//     }
// }

// // REGISTER route
// app.post("/register", async (req, res) => {
//     let { email, username, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     let newUser = new Users({
//         email,
//         username,
//         password: hashedPassword
//     });
//     await newUser.save();
//     res.json({
//         success: true,
//         data: newUser,
//         message: "user registered successfully!!!"
//     });
// });

// // LOGIN route
// app.post("/login", async (req, res) => {
//     let { email, password } = req.body;

//     let userExist = await Users.findOne({ email });
//     if (!userExist) {
//         return res.json({ success: false, message: "User not found" });
//     }

//     const validPassword = await bcrypt.compare(password, userExist.password);
//     if (!validPassword) {
//         return res.json({ success: false, message: "Invalid password" });
//     }

//     const token = jwt.sign(
//         { userId: userExist._id },
//         "secret123",
//         { expiresIn: "1h" }
//     );

//     res.json({
//         success: true,
//         message: "Login successful",
//         token
//     });
// });

// // ADD BLOG
// app.post("/blogs", isLogin, async (req, res) => {
//     let { title, body } = req.body;
//     let userId = req.userId;

//     let userExist = await Users.findById(userId);
//     if (userExist) {
//         let newBlog = new Blogs({
//             title,
//             body,
//             date: Date.now(),
//             userId
//         });
//         await newBlog.save();
//         userExist.blogs.push(newBlog._id);
//         await userExist.save();
//         res.json({
//             success: true,
//             data: newBlog,
//             message: "blog added successfully!!!"
//         });
//     }
// });

// // GET single blog
// app.get("/blogs/:id", async (req, res) => {
//     let { id } = req.params;
//     let blog = await Blogs.findOne({ _id: id });
//     res.json({ success: true, data: blog });
// });

// // GET all users
// app.get("/users", async (req, res) => {
//     let allUsers = await Users.find();
//     res.json({ success: true, data: allUsers });
// });

// // GET single user with blogs
// app.get("/users/:id", async (req, res) => {
//     let { id } = req.params;
//     let userExist = await Users.findOne({ _id: id }).populate("blogs");
//     if (userExist) {
//         res.json({ success: true, data: userExist });
//     }
// });

// // DELETE blog
// app.delete("/blogs/:blogId", async (req, res) => {
//     let { blogId } = req.params;
//     let { userId } = req.body;

//     let blogExist = await Blogs.findById(blogId);
//     if (!blogExist) return res.json({ success: false, message: "Blog doesn't exist" });

//     if (blogExist.userId.toString() !== userId) {
//         return res.json({ success: false, message: "You are not allowed to delete this blog" });
//     }

//     await Blogs.findByIdAndDelete(blogId);

//     let userExist = await Users.findById(userId);
//     userExist.blogs = userExist.blogs.filter((id) => id.toString() !== blogId);
//     await userExist.save();

//     res.json({
//         success: true,
//         message: "blog deleted successfully",
//         data: userExist
//     });
// });

// app.listen(4455, () => console.log("Server started"));

// mongoose.connect("mongodb://127.0.0.1:27017/g26DB")
//     .then(() => console.log("Connected!"));






// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // MODELS
// const Blogs = require("./model/blog");
// const Users = require("./model/user");

// // 🔹 Middleware to check JWT
// function isLogin(req, res, next) {
//     const token = req.headers["authorization"]; // Expecting "Bearer <token>"

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Access denied. No token provided"
//         });
//     }

//     try {
//         const bearer = token.split(" "); // split "Bearer token"
//         const decoded = jwt.verify(bearer[1], "secret123");
//         req.userId = decoded.userId;
//         next();
//     } catch (err) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid token"
//         });
//     }
// }

// // 🔹 REGISTER route
// app.post("/register", async (req, res) => {
//     try {
//         let { email, username, password } = req.body;

//         let existing = await Users.findOne({ email });
//         if (existing) {
//             return res.json({ success: false, message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         let newUser = new Users({
//             email,
//             username,
//             password: hashedPassword
//         });

//         await newUser.save();

//         res.json({
//             success: true,
//             data: newUser,
//             message: "User registered successfully!"
//         });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// });

// // 🔹 LOGIN route
// app.post("/login", async (req, res) => {
//     try {
//         let { email, password } = req.body;

//         let userExist = await Users.findOne({ email });
//         if (!userExist) {
//             return res.json({ success: false, message: "User not found" });
//         }

//         const validPassword = await bcrypt.compare(password, userExist.password);
//         if (!validPassword) {
//             return res.json({ success: false, message: "Invalid password" });
//         }

//         const token = jwt.sign(
//             { userId: userExist._id },
//             "secret123",
//             { expiresIn: "1h" }
//         );

//         res.json({
//             success: true,
//             message: "Login successful",
//             token
//         });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// });

// // 🔹 ADD BLOG (protected)
// app.post("/blogs", isLogin, async (req, res) => {
//     try {
//         let { title, body } = req.body;
//         let userId = req.userId;

//         let userExist = await Users.findById(userId);
//         if (!userExist) {
//             return res.json({ success: false, message: "User not found" });
//         }

//         let newBlog = new Blogs({
//             title,
//             body,
//             date: Date.now(),
//             userId
//         });

//         await newBlog.save();
//         userExist.blogs.push(newBlog._id);
//         await userExist.save();

//         res.json({
//             success: true,
//             data: newBlog,
//             message: "Blog added successfully!"
//         });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// });

// // 🔹 GET single blog
// app.get("/blogs/:id", async (req, res) => {
//     try {
//         let { id } = req.params;
//         let blog = await Blogs.findById(id);
//         if (!blog) return res.json({ success: false, message: "Blog not found" });

//         res.json({ success: true, data: blog });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// });

// // 🔹 GET all users
// app.get("/users", async (req, res) => {
//     let allUsers = await Users.find();
//     res.json({ success: true, data: allUsers });
// });

// // 🔹 GET single user with blogs
// app.get("/users/:id", async (req, res) => {
//     try {
//         let { id } = req.params;
//         let userExist = await Users.findById(id).populate("blogs");
//         if (!userExist) return res.json({ success: false, message: "User not found" });

//         res.json({ success: true, data: userExist });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// });

// // 🔹 DELETE blog (protected)
// app.delete("/blogs/:blogId", isLogin, async (req, res) => {
//     try {
//         let { blogId } = req.params;
//         let userId = req.userId;

//         let blogExist = await Blogs.findById(blogId);
//         if (!blogExist) return res.json({ success: false, message: "Blog doesn't exist" });

//         if (blogExist.userId.toString() !== userId) {
//             return res.json({ success: false, message: "You are not allowed to delete this blog" });
//         }

//         await Blogs.findByIdAndDelete(blogId);

//         let userExist = await Users.findById(userId);
//         userExist.blogs = userExist.blogs.filter((id) => id.toString() !== blogId);
//         await userExist.save();

//         res.json({
//             success: true,
//             message: "Blog deleted successfully",
//             data: userExist
//         });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// });

// // SERVER + DB
// mongoose.connect("mongodb://127.0.0.1:27017/g26DB")
//     .then(() => {
//         console.log("MongoDB Connected!");
//         app.listen(4455, () => console.log("🚀 Server running on http://localhost:4455"));
//     })
//     .catch(err => console.error("DB connection error:", err));



//1. create a login route and generate a jwt token with payload ---> {"userId" = user._d}
//2. In route post/blog add middleware isLogin, in this middleware verify jwt token and modify request object like req.userId = decode.userId


const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { isLogin } = require("./middleware/token");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Blogs = require("./model/user")
const Users = require("./model/user")
console.log(Blogs, Users)

app.post("/api/auth/login", async (req, res) => {
    let { email, password } = req.body;
    let userExist = await Users.findOne({ email: email });
    if (!userExist) {
        res.json({
            success: false,
            message: "User doesn't exist"
        })
    }
    if (userExist.password != password) (
        res.json({
            success: false,
            message: "Invalid user"
        })
    )
    let token = jwt.sign({"userId": userExist._id}, "blogs");
    return res.json ({
        success: true,
        message: "login successful",
        token: token
    })
})

app.post("/blogs", isLogin, async(req, res) => {
    let {title, body} = req.body;
    const userId = req.userId;
    let userExists = await Users.findById(userId);
    if (userExists) {
        let newBlog = new Blogs ({
            title: title,
            body: body,
            date: Date.now(),
            userId: req.userId
        })
        await newBlog.save();
        userExists.blogs.push(newBlog._id);
        await userExists.save();
        res.json ({
            success: true,
            data: newBlog,
            message: "Blog added successfully"
        })
    }
})

app.get("/blogs", async (req, res) => {
    let allblog = await Blogs.find();
    res.json ({
        success: true,
        data: allblog
    })
})

app.get("/blogs/:id", async (req, res) => {
    let {id} = req.params
    let blog = await Blogs.findOne({_id:id});
    res.json ({
        success: true,
        data: Blog
    })
})

app.post("/users", async (req, res) => {
    let { email, username, password } = req.body;
    let newUser = new Users ({
        email: email,
        username: username,
        password: password
    });
    await newUser.save();
    res.json({
        success: true,
        data: newUser,
        message: "User added successfully!!!"
    });
});

app.get("/users", async (req, res) => {
    let allUsers = await Users.find();
    res.json ({
        success: true,
        data: allUsers
    });
});

app.get("/users/:id", async (req, res) => {
    let { id } = req.params;
    console.log(id)
    let userExist = await Users.findOne({ _id: id }).populate("blogs")
    console.log(userExist);
    if (userExist) {
        res.json ({
            success: true,
            data: userExist
        });
    }
});

//delete blog
app.delete("blogs/:blogId", async (req, res) => {
    let {blogId} = req.params;
    let {userId} = req.body;
    let blogExists = await Blogs.findById(blogId);
    if (!blogExists) return res.json ({
        success: false,
        message: "Blog doesn't exist"
    })
    if (blogExists.userId != password) ({
        success: false,
        message: "You are not allowed to delete the blog"
    })
    await Blogs.findByIdAndDelete(blogId);
    let userExist = await Users.findById(userId);
    let blog = userExist.blogs.filter((id) => id != blogId);
    userExist.blogs = blog;
    await userExist.save();
    res.json({
        success: true,
        message: "Blog deleted successfully",
        data: userExist
    })
})

//Update blog
app.put("/blogs/:blogId", async (req, res) => {
    let {blogId} = req.params;
    let {title, body, userId} = req.body;
    let blogExists1 = await Blogs.findById(blogId)
    if (!blogExists1) return res.json ({
        success: false,
        message: "Blog doesn't exist"
    })
    if (blogExists1.userId != userId) ({
        success: false,
        message: "You are not allowed to delete the blog"
    })
    let updatedBlog = await Blogs.findByIdAndUpdate(blogId,{ title, body } );
    res.json ({
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog
    });
})

app.listen(3002, () => {
    console.log("Server Started");
})

mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));