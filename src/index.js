import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import State from './components/state'
import PersistentStorage from './components/persistentStorage'
import Router from './components/router'

import './styles/style.css'

const db = new PersistentStorage()
const repo = new State(db)
const router = new Router()

repo.on('stateChanged', () => {
  ReactDOM.render(<App repo={repo} router={router} />, document.getElementById('root'))
})

router.on('urlChanged', () => {
  ReactDOM.render(<App repo={repo} router={router} />, document.getElementById('root'))
})

ReactDOM.render(<App repo={repo} router={router} />, document.getElementById('root'))




