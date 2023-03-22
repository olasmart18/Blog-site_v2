import Post from '../model/post.js';

export const getAllPost = async (req, res) => {
  const founddPosts = await Post.find({});

  if (founddPosts !== null) {
    return res.render('pages/posts', {
      posts: founddPosts
    });
  } else {
    res.render('pages/error');
    // return res.status(401).json({
    //   success: false,
    //   message: 'cannot find post'
    // });
  }
};

export const getSinglePost = async (req, res) => {
  const title = req.params.title;
  const founddPost = await Post.findOne({ title: title });

  if (founddPost) {
    const postTitle = founddPost.title;
    const postContent = founddPost.content;

    res.render('pages/post', {
      postTitle,
      postContent
    });
  } else {
    res.render('pages/error');
    // res.status(404).json({
    //   success: false,
    //   message: 'cannot find post'
    // });
  }
};

export const compose = async (req, res) => {
  return res.render('pages/compose');
};

export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.redirect('/posts');
  } catch (error) {
    res.render('pages/error');
    // res.status(401).json({
    //   success: false,
    //   message: 'failed!, try again'
    // });
  }
};

export const deleteAllPost = async (req, res) => {
  try {
    await Post.deleteMany({});
    res.status(200).json({
      success: true,
      message: 'posts deleted'
    });
  } catch (error) {
    res.render('pages/error');
    // res.status(401).json({
    //   success: false,
    //   message: 'failed!, try again'
    // });
  }
};

export const deleteSinglePost = async (req, res) => {
  const title = req.params.title;
  try {
    const del = await Post.findOneAndDelete({ title: title });
    console.log(del);
    res.redirect('/posts');
    // res.status(200).json({
    //     success: true,
    //     message: "posts deleted"
    // })
  } catch (error) {
    res.render('pages/error');
    // res.status(401).json({
    //   success: false,
    //   message: 'failed!, try again'
    // });
  }
};

export const comment = async (req, res) => {
  const title = req.params.title;
  const comment = req.body.comment;
  try {
    await Post.findOneAndUpdate(
      { title: title },
      { $push: { comments: comment } },
      { new: true }
    );
    res.redirect('/posts');
  } catch (error) {
    res.render('pages/error');
    // res.status(404).json({
    //   success: false,
    //   message: 'error, try again!'
    // });
  }
};
