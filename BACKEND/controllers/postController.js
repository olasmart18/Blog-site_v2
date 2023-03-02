import post from "../model/post.js";

export const postPage = async(req, res) => {
    res.render("pages/post")
}
export const getAllPost = async (req, res) => {
    try {
        const founddPosts = await post.find({})
        res.redirect("/post")
        // res.status(200).json({
        //     success: true,
        //     message: "posts found",
        //     data: founddPosts
        // })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "cannot find post"
        })
    }
}

export const getSinglePost = async (rew, res) => {
    const title = req.params.title
    try {
        const founddPost = await post.findOne({ title: title });
        res.status(200).json({
            success: true,
            message: "post found",
            data: founddPost
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "cannot find post"
        })
    }
}

export const createPost = async (req, res) => {
    const newPost = new post(req.body);
    try {
        const savePost = await newPost.save()
        res.status(200).json({
            success: true,
            message: "post created",
            data: savePost
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "failed!, try again"
        })
    }
}

export const deleteAllPost = async (req, res) => {
    try {
        await post.deleteMany({})
        res.status(200).json({
            success: true,
            message: "posts deleted"
        })

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "failed!, try again"
        })
    }
}

export const deleteSinglePost = async (req, res) => {
    const title = req.params.title
    try {
        await post.findOneAndDelete({ title: title })
        res.status(200).json({
            success: true,
            message: "posts deleted"
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "failed!, try again"
        })
    }
}

export const updatePost = async (req, res) => {
    const title = req.params.title;
    try {
        await post.findOneAndUpdate({ title },
            { $set: req.body },
            { new: true });
        res.status(200).json({
            success: true,
            message: "posts updated"
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "failed!, try again"
        })
    }
}