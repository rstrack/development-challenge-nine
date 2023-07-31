import 'dotenv/config'
import cors from 'cors'
import express, { json } from 'express'
import helmet from 'helmet'
import { routes } from './routes/routes'

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS || ''
const allowedOriginsArray = allowedOrigins.split(',')

const app = express()

app.use(json())
app.use(helmet())
app.use(
  cors({
    origin: allowedOriginsArray,
  })
)

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`server running -> http://localhost:${process.env.PORT}`)
})
