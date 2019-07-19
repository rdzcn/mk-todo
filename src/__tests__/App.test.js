import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import State from '../components/state'
import TemporaryStorage from '../components/temporaryStorage'
import Router from '../components/router'

import { data } from '../data/temporaryData'

const db = new TemporaryStorage(data)
const repo = new State(db)
const router = new Router(db)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App repo={repo} router={router} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
