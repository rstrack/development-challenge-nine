import 'dotenv/config'
import cors from 'cors'
import express, { json } from 'express'
import { routes } from './routes/routes'

const app = express()

app.use(json())
app.use(cors())
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`server running -> http://localhost:${process.env.PORT}`)
})
