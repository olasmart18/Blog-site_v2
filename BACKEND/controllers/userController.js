import User from "../model/user.js"

// const homeStartingContent = "welcome to my blog website, stay calm as we serve you intresting content"

export const myLoginPage = async (req, res) => {
    res.render("pages/login")
}

export const myRegPage = async (req, res) => {
    res.render("pages/register")
}

export const homePage = async (req, res) => {
    res.render("pages/home")
}

export const register = async (req, res) => {
    const newReg = new User(req.body)

    try {
        await newReg.save();
        // return res.status(200).json({
        //     succuss: true,
        //     message: "successful!",
        //     data: newUser
        // })
        res.redirect("/login");
    } catch (error) {
        res.status(401).json({
            succuss: false,
            message: "failed, try again!"
        })
    }
}


export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password



    try {
        const findUser = await User.findOne({ email: email })
        if (findUser) {
            if (password === findUser.password) {
                res.redirect("/")
                // res.status(200).json({
                //     succuss: true,
                //     message: "user logged in"
                // })
            } else {
                res.status(401).json({
                    succuss: false,
                    message: " email or password incorrect"
                })
            }

        }
    } catch (error) {
        res.status(404).json({
            succuss: false,
            message: "failed, try again!"
        })
    }
}