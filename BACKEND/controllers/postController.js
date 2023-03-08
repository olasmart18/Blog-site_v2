import post from "../model/post.js";


export const getAllPost = async (req, res) => {
    const founddPosts = await post.find({})

    if (founddPosts !== null) {

        return res.render("pages/posts",
            {
                posts: founddPosts
            })
    } else {
        return res.status(401)
            .json({
                success: false,
                message: "cannot find post"
            })
    }
}


export const getSinglePost = async (req, res) => {
    const title = req.params.title
 const founddPost = await post.findOne({ title: title });
    
       if (founddPost){
            const postTitle = founddPost.title;
            const postContent = founddPost.content;

            res.render("pages/post", {
                postTitle,
                postContent
            })
       }
       
    else {
        res.status(404).json({
            success: false,
            message: "cannot find post"
        })
    }
}

export const compose = async (req, res) => {
    return res.render("pages/compose")
}

export const createPost = async (req, res) => {
    const newPost = new post(req.body);
    try {
        const savePost = await newPost.save()
        res.redirect("/")



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