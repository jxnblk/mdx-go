import React from 'react'
import { render } from 'react-dom'

const App = require(__FILENAME__).default

render(
  <App />,
  document.getElementById('root')
)

if (module.hot) module.hot.accept()
