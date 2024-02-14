const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwt middleware")
    // token verification happens here
    // get the token from the req header
    const token = req.headers['authorization'].slice(7)
    console.log(token);
    // Verify the token
    try {
        const tokenverification = jwt.verify(token, "superkey2024")
        console.log(tokenverification);
        req.payload = tokenverification.userId

    } catch (err) {
        res.status(401).json("Authorization failedd...Please login again...!")
    }

    next()
}

module.exports = jwtMiddleware