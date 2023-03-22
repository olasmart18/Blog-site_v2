
const isAdmin = async (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next();
  } else {
    // console.log("");
    res.send('NOT AUTHORISED');
  }
};
export default isAdmin;
