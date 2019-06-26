import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "./styles/style.css"
import State from "./components/State"

const repo = new State()
repo.on('stateChanged', () => {
  ReactDOM.render(<App repo={repo}/>, document.getElementById('root'))
})

ReactDOM.render(<App repo={repo}/>, document.getElementById("root"))

