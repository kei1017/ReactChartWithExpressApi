const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./queries')

const app = express()
const port = 3030

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: '*'
}))

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/auth', db.authUser)

app.get('/user', db.getUsers)
app.get('/user/:id', db.getUserById)
app.post('/user', db.createUser)
app.put('/user/:id', db.updateUser)
app.delete('/user/:id', db.deleteUser)

app.post('/filtered-data', db.getData)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
