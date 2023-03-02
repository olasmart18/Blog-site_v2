import { Schema, model } from "mongoose";

const postSchema = Schema ({
    title: String,
    content: String,
    review: []
})

const Post = model("Post", postSchema);

export default Post;