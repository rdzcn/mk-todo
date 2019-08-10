import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import State from '../components/state'
import TemporaryStorage from '../components/temporaryStorage'
import Router from '../components/router'

const temporaryStorage = new TemporaryStorage()
const state = new State(temporaryStorage)
const router = new Router(temporaryStorage)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App state={state} router={router} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
