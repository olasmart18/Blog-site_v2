import { Schema, model } from "mongoose";
import postSchema from "../model/post.js"

const userSchema = Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String  
})

const User = new model("User", userSchema);

export default User;