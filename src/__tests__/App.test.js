import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import State from '../components/state'
import TemporaryStorage from '../components/temporaryStorage'

const temporaryStorage = new TemporaryStorage()
const state = new State(temporaryStorage)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App state={state} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
