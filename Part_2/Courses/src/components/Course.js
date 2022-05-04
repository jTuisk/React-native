
import React from 'react'

const Course = (props) => {
  const parts = () => props.courses.parts.map(part => <Content key={part.id} parts={part} />)
  return (
    <div>
      <Header header={props.courses.name} />
      {parts()}
      <Total parts={props.courses.parts} /> 
    </div>
  )
}

const Header = (props) => {
  return (
  <div>
    <h1>{props.header}</h1>
  </div> 
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts}/>
    </div>
  )
}

const Part = (props) => {
  return(
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  const total = () => props.parts.map(part => part.exercises).reduce((a, b) => a + b)
  return (
    <div>
      <p>Total {total()}</p>
    </div> 
  )
}


export default Course