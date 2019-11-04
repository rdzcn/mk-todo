import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import State from './components/state'
import PersistentStorage from './components/persistentStorage'

import './styles/style.css'

const persistentStorage = new PersistentStorage()
const state = new State(persistentStorage)

state.on('stateChanged', () => {
  ReactDOM.render(<App state={state} />, document.getElementById('root'))
})

ReactDOM.render(<App state={state} />, document.getElementById('root'))




