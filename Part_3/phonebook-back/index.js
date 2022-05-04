const { response } = require('express')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
const logger = (request, response, next) => {
  console.log('Method:',request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(bodyParser.json())
app.use(logger)

const password = "localhost"
const url = "mongodb+srv://localhost:"+password+"@janek-dtek2040.pna13.mongodb.net/janek-dtek2040"
mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})

const formatPerson = (note) => {
  return {
    name: note.name,
    number: note.number,
    id: note.id
  }
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/persons', (request, response) => {
  Person.find().then(person => {
    response.json(person.map(formatPerson))
  })
})


app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  Person.find({id: id}).then(person => {
    response.json(person.map(formatPerson))
  })
})

app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  Person.findOneAndRemove({id: id}).then(result => {
    response.status(204).end()
  }).catch(error => {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  })
})

app.post('/persons', (request, response) => {
  const body = request.body
  
  if(body.name === undefined || body.name.length < 1 || 
      body.number === undefined || body.number.length < 1)
    return response.status(400).json({error: 'data missing'})

  const result = Person.find({name: body.name})

  if(result.length !== undefined)
    return response.status(400).json({error: 'name must be unique'})

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateRandomId()
  })

  person.save().then(result => {
    console.log(person)  
    response.send(person)
  }).catch(error => {
    console.log(error)
    response.status(204).end()
  })
})

const generateRandomId = () => {
  let max = 1000000000
  return Math.floor(Math.random() * max);
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})