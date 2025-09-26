const express = require("express");
const router = require("./blogRoutes");
const app = express.Router();

router.post("/", async (req, res) => {
    let { title, body, userId } = req.body;
    let userExist = await user.findById(userId);
    if (userExist) {
        let newBlog = new Blogs({
            title: title,
            body: body,
            date: Date.now(),
            userId: userId
        })
        await newBlog.save()
        userExist.blogs.push(newBlog._id)
        await userExist.save();
        res.json({
            success: true,
            data: newBlog,
            message: "blog added successfully!!!"
        })
    }
})

router.get("/:id", async (req, res) => {
    let { id } = req.params
    let blog = await Blogs.findOne({ _id: id });
    res.json({
        success: true,
        data: blog
    })
})

module.exports = router;

router.delete("/:blogId", async (req, res) => {
    let { blogId } = req.params;
    let { userId } = req.body;
    let { blogExist } = await Blogs.findById(blogId);
    if (!blogExist) return res.json({
        success: false,
        message: "Blog doesn't exist"
    })
    if (blogExist.userId.toString !== userId) return res.json({
        success: false,
        message: "You are not allowed to delete this blog"
    })
    await Blogs.findByIdAndDelete(blogId);
    let userExist = await user.findById(userId);
    let blog = userExist.blogs.filter((id) => id !== blogId)
    userExist.blogs = blog
    await userExist.save();
    res.json({
        success: true,
        message: "blog deleted successfully",
        data: userExist
    })
})

