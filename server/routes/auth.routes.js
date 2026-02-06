const { register, login, logout } = require("../controllers/auth.controller.js")
const ratelimit = require('express-rate-limit')

const router = require("express").Router()

const authLimiter = ratelimit({
    window: 1000 * 60,
    max: 3
})

router
    .post("/signup", register)
    .post("/signin", authLimiter, login)
    .post("/signout", logout)

module.exports = router