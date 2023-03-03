
 const isAdmin = async(req, res, next) =>{
    if(req.session && req.session.isAdmin){
       next()
    }else{
        // console.log("");
        res.send("you are not authorised")
    }
}
export default isAdmin;