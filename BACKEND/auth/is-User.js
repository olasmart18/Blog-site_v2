 const isUser = async (req, res, next) => {
    if(req.session && req.session.isUser){
   return next()
    }else{
      return  res.redirect("/login")
    }
}
export default isUser