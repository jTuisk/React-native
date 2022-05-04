import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
  this.state = {
      header: "anna palautetta",
      subtitle: "statistiikka",
      buttons :[
        {
          title: "Hyvä",
          clicks: 0,
          power: 1
        },
        {
          title: "Neutraali",
          clicks: 0,
          power: 0
        },
        {
          title: "Huono",
          clicks: 0,
          power: -1
        }
      ],
      average: 0,
      positive: 0
    }
  }

  ButtonFunction = (id) => {
    let tempButtons = this.state.buttons
    tempButtons[id].clicks = tempButtons[id].clicks + 1
    this.setState({
      buttons: tempButtons
    })

    let totalClicks = this.state.buttons[0].clicks + this.state.buttons[1].clicks + this.state.buttons[2].clicks 

    let temp_avg = ((this.state.buttons[0].clicks*this.state.buttons[0].power) +
                    (this.state.buttons[1].clicks*this.state.buttons[1].power) +
                    (this.state.buttons[2].clicks*this.state.buttons[2].power))/totalClicks
    this.setState({
      average: temp_avg.toFixed(1)
    })

    let temp_positive = this.state.buttons[0].clicks/totalClicks*100
    this.setState({
      positive: temp_positive.toFixed(1)
    })


  }

  render() {
    return (
      <div>
        <Subtitle title={this.state.header}/>
        <Buttons from = {this} />
        <Statistics state={this.state} />
      </div>
    )
  }
}

const Buttons = (props) => {
  return (
    <div>
        <Button action={() => props.from.ButtonFunction(0)} title={props.from.state.buttons[0].title} />
        <Button action={() => props.from.ButtonFunction(1)} title={props.from.state.buttons[1].title} />
        <Button action={() => props.from.ButtonFunction(2)} title={props.from.state.buttons[2].title} />
    </div>
  )   
}

const Statistics = (props) => {
  let totalClicks = props.state.buttons[0].clicks + props.state.buttons[1].clicks + props.state.buttons[2].clicks 
  if (totalClicks < 1) {
    return (
      <div>
        <Subtitle title={props.state.subtitle}/>
        <em>Ei yhtään palautetta annettu</em>
      </div>
    )
  }
  return (
    <div>
    <Subtitle title={props.state.subtitle}/>
      <table>
        <tbody>
          <TotalClicks title={props.state.buttons[0].title} clicks={props.state.buttons[0].clicks}/>
          <TotalClicks title={props.state.buttons[1].title} clicks={props.state.buttons[1].clicks}/>
          <TotalClicks title={props.state.buttons[2].title} clicks={props.state.buttons[2].clicks}/>
          <Statistic title={"Average"} value={props.state.average} />
          <Statistic title={"Positiivisia"} value={props.state.positive} />
        </tbody>
      </table>
    </div>
  ) 
}

const Statistic  = (props) => {
  return (
    <tr>
      <td>{props.title} {props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.action}>{props.title}</button>
  )
}

const Subtitle = (props) => {
  return (
    <h2><b>{props.title}</b></h2>
  )
}

const TotalClicks = (props) => {
  return (
    <tr>
      <td>{props.title} {props.clicks}</td>
    </tr>
  )
}


ReactDOM.render(
  <App/>,
  document.getElementById('root')
)