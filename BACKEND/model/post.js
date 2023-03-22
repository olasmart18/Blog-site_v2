import { Schema, model } from 'mongoose';

const postSchema = Schema({
  title: String,
  content: String,
  comments: Array
});

const Post = model('Post', postSchema);

export default Post;
