import path from 'path'
import React from 'react'
import { render, hydrate } from 'react-dom'
import App from './App'

const div = document.getElementById('root')
const mount = div.innerHTML ? hydrate : render

const basename = __BASENAME__
const props = __OPTIONS__
props.basepath = basename

mount(<App {...props} />, div)

if (module.hot) module.hot.accept()
