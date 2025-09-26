const Blogs = require("../model/user");

module.exports.postAddBlog = async (req, res) => {
    let { title, body, uderId } = req.body;
    let userExists = await Users.findById(userId);
    if (userExists) {
        let newBlog = new Blogs({
            title: title,
            body: body,
            date: Date.now(),
            userId: userId
        })

        await newBlog.save();

        userExists.blogs.push(newBlog._id);
        await userExists.save();
        res.json({
            success: true,
            data: newBlog,
            message: "blog added successfully!!"
        })
    }
}
module.exports.getBlog = async (req, res) => {
    let allblog = await Blogs.find();
    res.json({
        success: true,
        data: allblog
    })
}

module.exports.getOneBlog = async (req, res) => {
    let { id } = req.params
    let blog = await Blogs.findOne({ _id: id });
    res.json({
        success: true,
        data: blog
    })
}

module.exports.deleteOneBlog = async (req, res) => {
    let { blogId } = req.params;
    let { userId } = req.body;
    let blogExists = await Blogs.findById(blogId);
    if (!blogExists) return res.json({
        success: false,
        message: "Blog doesn't exist"
    })
    if (blogExists.userId != userId) ({
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
}

module.exports.updateOneBlog = async (req, res) => {
    let { blogId } = req.params;
    let { title, body, userId } = req.body;
    let blogExists1 = await Blogs.findById(blogId);
    if (!blogExists1) return res.json({
        success: false,
        message: "Blog doesn't exist"
    })
    if (blogExists1.userId != userId) ({
        success: false,
        message: "You are not allowed to delete the blog"
    })
    let updatedBlog = await Blogs.findByIdAndUpdate(blogId, { title, body });
    res.json({
        success: true,
        message: "Blog updated successfuly",
        data: updatedBlog
    });
}