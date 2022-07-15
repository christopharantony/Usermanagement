const express = require("express")
const app = express()

const authRoutes = require("./Routes/AuthRoutes")

const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const adminrouter = require("./Routes/AdminRoutes")
require("dotenv").config();


app.listen(4000, () => {
    console.log("http://localhost:4000")
});

mongoose.connect("mongodb://localhost:27017/jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})

app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json());
app.use("/admin",adminrouter)
app.use("/",authRoutes)