













import express from 'express'
import cors from 'cors'

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (request: any, response: { send: (arg0: string) => void }) => {
  response.send('Hello, GraphQL!')
})

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`)
})


