import  express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"

dotenv.config()

const app = express()


// Middlewares
app.use(cors()) // Enable CORS
app.use(helmet()) // Enable Helmet to security check
app.use(morgan("dev")) // Enable Morgan to register logs
app.use(express.json()) // Enable JSON parsing


// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

// Error global handlers
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Ups, something were wrong!' })
})

export default app