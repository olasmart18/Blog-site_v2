import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import _ from 'lodash';
import connect from './BACKEND/config/db-Config.js';
import store  from './BACKEND/config/conntSession.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userRoute from './BACKEND/routers/userRoute.js';
import postRoute from './BACKEND/routers/postRoute.js';
dotenv.config();


const port = process.env.PORT;

const aboutContent = "Read about us here"
const contactContent = "contact Us here"
const posts = [];
const app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 24*60*60*1000,
        secure: false,
        httpOnly:true,
        sameSite: false
    },
    store: store
}))
app.use(cookieParser())
app.use("/", userRoute);
app.use("/", postRoute);

// app.get("/", function (req, res) {
//     res.render("pages/home", { homeStartingContent: homeStartingContent, Posts: posts })
// });

app.get("/about", function (req, res) {
    res.render("pages/about", { aboutContent: aboutContent });
})

app.get("/contact", function (req, res) {
    res.render("pages/contact", { contactContent: contactContent })
})

app.get("/compose", function (req, res) {
    res.render("pages/compose")
})

// app.get("/register", function (req, res){
//     res.render("pages/register")
// })


app.post("/compose", function (req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postContent
    };
    posts.push(post);
    // console.log(posts);
    res.redirect("/");
});

app.get("/post/:postName", function (req, res) {
    // console.log();
    const requestedPostName = _.lowerCase(req.params.postName);


    posts.forEach(function (post) {
        const postNameTitle = _.lowerCase(post.title);
        if (requestedPostName === postNameTitle) {
            res.render("pages/post", { 
                inComingPostTitle: post.title, 
                inComingPost: post.content
            });
        } else {
            console.log("match not found");
        }
    })
})

app.listen(port, function () {
    connect();
    console.log(`serving on port ${port}`);
})