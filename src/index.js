import mongoose, { connect } from "mongoose";
import express from "express"
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js"

const app = express()
dotenv.config({
    path: './.env'
})

app.get("/health", (req,res)=>{
    res.send(`hello from server`)
})
app.use("/api/v1/users", userRouter);

connectDB()
.then  (() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running on port : ${
            process.env.PORT
        }`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!!", err);
})






















/*
import express from "express"
const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()

*/