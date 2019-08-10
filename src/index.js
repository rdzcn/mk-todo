import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import State from './components/state'
import PersistentStorage from './components/persistentStorage'
import Router from './components/router'

import './styles/style.css'

const persistentStorage = new PersistentStorage()
const state = new State(persistentStorage)
const router = new Router(persistentStorage)

state.on('stateChanged', () => {
  ReactDOM.render(<App state={state} router={router} />, document.getElementById('root'))
})

router.on('urlChanged', () => {
  ReactDOM.render(<App state={state} router={router} />, document.getElementById('root'))
})

ReactDOM.render(<App state={state} router={router} />, document.getElementById('root'))




