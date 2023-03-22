import bcrypt from 'bcrypt';
import User from '../model/user.js';

export const myLoginPage = async (req, res) => {
  res.render('pages/login');
};

export const myRegPage = async (req, res) => {
  res.render('pages/register');
};

export const homePage = async (req, res) => {
  res.render('pages/home');
};

export const register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const foundUser = await User.findOne({ email: email });
  if (foundUser) {
    return res.send('user already exist, please login');
  }
  const newReg = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: username,
    email: email,
    password: hash
  });

  try {
    await newReg.save();
    res.redirect('/login');
  } catch (error) {
    res.status(401).json({
      succuss: false,
      message: 'failed, try again!'
    });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const findUser = await User.findOne({ email: email });

  if (findUser) {
    const checkPassword = bcrypt.compareSync(password, findUser.password);
    if (checkPassword) {
      req.session.isAdmin = true;
      req.session.isUser = true;
      req.session.user = findUser._id;
      req.session.role = 'user';
      return res.redirect('/');
    } else {
      return res.status(401).json({
        succuss: false,
        message: ' email or password incorrect'
      });
    }
  }

  res.status(404).json({
    succuss: false,
    message: 'failed, try again!'
  });
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    } else {
      res.render('pages/error');
    }
  });
};

export const contactPage = async (req, res) => {
  res.render('pages/contact');
};

export const aboutPage = async (req, res) => {
  res.render('pages/about');
};
