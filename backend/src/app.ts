











import express from 'express'
import cors from 'cors'

const app = express()
const port = 4000

// enable cors
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`)
})


