import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import State from './components/state'
import PersistentStorage from './components/PersistentStorage'

import './styles/style.css'

const db = new PersistentStorage()
const repo = new State(db)

repo.on('stateChanged', () => {
  ReactDOM.render(<App repo={repo}/>, document.getElementById('root'))
})

db.on('dataChanged', () => {
  ReactDOM.render(<App repo={repo}/>, document.getElementById('root'))
})

ReactDOM.render(<App repo={repo} pathname={window.location.pathname} />, document.getElementById('root'))




