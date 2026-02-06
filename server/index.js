const express = require("express")
require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const ratelimit = require('express-rate-limit')

const cors = require("cors")
const protect = require("./middlewar/protect.js")
mongoose.connect(process.env.MONGO_URL)

const app = express()

// const limiter = ratelimit({
//     window: 1000 * 60,
//     max: 5
// })

// app.use(limiter)

// app.use(cors({
//     origin:
//         process.env.NODE_ENV === "production"
//             ? "https://killer01-fbqz.vercel.app"
//             : "http://localhost:3000",
//     credentials: true
// }))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/todo", protect, require("./routes/todo.routes.js"))
app.use("/api/auth", require("./routes/auth.routes.js"))

mongoose.connection.once("open", () => {
    console.log("db connected")
    app.listen(process.env.PORT, console.log("server running..."))
})

module.exports = app