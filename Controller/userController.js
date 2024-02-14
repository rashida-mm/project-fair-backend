const users = require('../Models/userSchema')

const jwt = require('jsonwebtoken')

//register logic
exports.register = async (req, res) => {
    console.log("Inside register function");

    const { username, email, password } = req.body

    // if check the email is already in db 

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(401).json('User already exists')
        } else { // if the email is not in the db then to save it to the db
            const newUser = await users({
                username, email, password, github: "", link: "", profile: ""
            })
            await newUser.save()
            res.status(200).json("User registeration successfull !")
        }
    } catch (err) {
        res.status(500).json("server error" + err.message)
    }
    console.log(`${username} ${email} ${password}`);

}

// login logic
exports.loginregister = async (req, res) => {
    console.log("Inside login-register function");

    const { email, password } = req.body

    try {
        // if check the email is already in db 
        const existingUserlogin = await users.findOne({ email, password })
        if (existingUserlogin) {
            const token = jwt.sign({ userId: existingUserlogin._id }, "superkey2024")
            console.log(token);
            res.status(200).json({ existingUserlogin, token })
        } else { // if the email is not in the db then to save it to the db
            res.status(401).json("Invalid User .")
        }
    } catch (err) {
        res.status(500).json("server error" + err.message)
    }
    console.log(`${email} ${password}`);

}

//profile setup
