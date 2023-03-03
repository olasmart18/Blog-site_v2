 const isUser = async (req, res, next) => {
    if(req.session && req.session.isUser){
       next()
    }else{
        res.redirect("/login")
    }
}
export default isUser