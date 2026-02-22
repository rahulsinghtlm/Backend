import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import { ApiError } from "./utils/ApiError.js"

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/health", (req, res) => {
  res.send("hello from server")
})

app.use("/api/v1/users", userRouter)

// 404 for unknown routes
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"))
})

// Global error handler – must have 4 arguments so Express treats it as error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode ?? 500
  const message = err.message ?? "Internal Server Error"
  const errors = err.errors ?? []

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    ...(errors.length > 0 && { errors }),
  })
})

export { app }