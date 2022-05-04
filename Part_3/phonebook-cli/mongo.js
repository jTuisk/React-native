
const mongoose = require('mongoose')

const password = "localhost"
const url = "mongodb+srv://localhost:"+password+"@janek-dtek2040.pna13.mongodb.net/janek-dtek2040"
mongoose.connect(url)

const generateRandomId = () => {
    let max = 1000000000
    return Math.floor(Math.random() * max);
  }

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
})

const parameters = process.argv.slice(2);

if(parameters.length == 2){
    const person = new Person({
        name: parameters[0],
        number: parameters[1],
        id: generateRandomId()
    })
    person.save().then(result => {
        console.log('Person saved!')
        mongoose.connection.close()
    })
}

if(parameters.length == 0){
    Person.find().then(result => {
        console.log("puhelinluettelo:")
        result.forEach(note => {
            console.log(note.name+" "+note.number)
        })
        mongoose.connection.close()
      }) 
}



/*

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema);


const note = new Note({
    content: 'Selain pystyy suorittamaan vain javascriptiä',
    date: new Date(),
    important: false
  })

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})*/