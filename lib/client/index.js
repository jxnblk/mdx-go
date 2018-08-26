import path from 'path'
import React from 'react'
import { render, hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const div = document.getElementById('root')
const mount = div.innerHTML ? hydrate : render

const basename = __BASENAME__

mount(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
  div
)

if (module.hot) module.hot.accept()
