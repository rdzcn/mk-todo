import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import State from '../components/state'
import TemporaryStorage from '../components/TemporaryStorage'

import { data } from '../data/temporaryData'

const db = new TemporaryStorage(data)
const repo = new State(db)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App repo={repo} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
