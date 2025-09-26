const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { isLogin } = require("./middleware/token");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));

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

  