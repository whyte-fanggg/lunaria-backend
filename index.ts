import express, { Request, Response, NextFunction } from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes"

dotenv.config()

const app = express()
const PORT = 4000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/", routes)

// DB Connection + Server Start
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server connected to DB & running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err)
  })

// Global error handler
type AppError = Error & { status?: number }

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err)
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong on the server.",
  })
})
