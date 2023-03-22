import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import _ from 'lodash';
import connect from './BACKEND/config/db-Config.js';
import store from './BACKEND/config/conntSession.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userRoute from './BACKEND/routers/userRoute.js';
import postRoute from './BACKEND/routers/postRoute.js';
dotenv.config();

const port = process.env.PORT;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
    sameSite: false
  },
  store: store
}));
app.use(cookieParser());
app.use('/', userRoute);
app.use('/', postRoute);

app.listen(port, function () {
  connect();
  console.log(`serving on port ${port}`);
});
