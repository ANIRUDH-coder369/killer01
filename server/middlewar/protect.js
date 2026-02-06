const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    // 1- check  for cookie and token if not available send error 
    // if every thing ok then call next()

    const ADMIN = req.cookies.ADMIN
    //when cookie send 

    if (!ADMIN) {
        return res.status(401).json({
            message: "no cookie found ", success: false

        })
    }
    //                                             from authencation login function payload of jwt.singin 
    jwt.verify(ADMIN, process.env.JWT_KEY, (_, decode) => {
        if (!decode) {
            res.status(401).json({ message: "invalid tojen", success: false })
        }
        next()
    })


}

module.exports = protect