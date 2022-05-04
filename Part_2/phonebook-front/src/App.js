import React from 'react';
import personService from './services/Axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: ''
    }
  }

  componentDidMount() {
    personService.getAll().then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()

    if(this.state.persons.find(person => person.name == this.state.newName) != undefined){
      window.alert("Name already in list!")
      return;
    }

    if(this.state.newNumber.length < 4){
      window.alert("Phone number too short!");
      return;
    }
    
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    personService.addPerson(newPerson).then(response => {
      this.setState({ persons: this.state.persons.concat(response.data),
                      newName: '',
                      newNumber: ''})
    })
  }

  RemoveName = (person) => {
    console.log(person);
    console.log(person.name);
    if(!window.confirm("Poistetaanko "+person.name))
      return;

    personService.remove(person.id).then(response => {
      this.setState({
        persons: this.state.persons.filter(p => p.id != person.id)
      })
    })
  }

  handleNameInputChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberInputChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  render() {
    return (
      <div>
      <h2>Puhelinluettelo</h2>
        <NewForm addPerson={this.addPerson}
                    newName={this.state.newName} handleNameInputChange={this.handleNameInputChange}
                    newNumber={this.state.newNumber} handleNumberInputChange={this.handleNumberInputChange}/>
        <PhoneNumberList persons={this.state.persons} removeName={this.RemoveName}/></div>
    )
  }
}
/*
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
            nimi: <input value={this.state.newName} onChange={this.handleNameInputChange} />
            <br/>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberInputChange} />
            <br/>
            <button type="submit">lisää</button>
        </form>
        <h2>Numerot</h2>
          {this.state.persons.map(person => <div key={person.name}>{person.name} &emsp; {person.number} <button onClick={() => this.RemoveName(person)}>poista</button></div>)}
        </div>
        */
const NewForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      nimi: <input value={props.newName} onChange={props.handleNameInputChange} />
      <br/>
      numero: <input value={props.newNumber} onChange={props.handleNumberInputChange} />
      <br/>
      <button type="submit">lisää</button>
    </form>
  )
}

const PhoneNumberList = (props) => {
  return (
    <div>
      <h2>Numerot</h2>
      {props.persons.map(person => <div key={person.name}>{person.name} &emsp; {person.number} <button onClick={() => props.removeName(person)}>poista</button></div>)}
    </div>
  )
}

export default App