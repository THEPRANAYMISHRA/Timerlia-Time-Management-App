const express = require("express")
const connection = require("./config/db")
const userrouter = require("./router/user.router")
require("dotenv").config()
const authenticate = require("./middleware/authanticate")
const dataroute = require("./router/userdataroute")
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")
const notesRouter = require("./router/notes.route")
const authrouter = require("./router/auth.route")
app.use(cors())
app.use(express.json())
app.use(cookieParser())



app.get("/", authenticate, (req, res) => {
    res.status(200).send({ msg: "hello backend" })
})
app.use("/auth",authrouter)

app.use("/user", userrouter)

app.use("/app", authenticate, dataroute)

app.use('/note', authenticate, notesRouter)

app.listen(process.env.port, async () => {
    await connection
    console.log("connected to DB")
})