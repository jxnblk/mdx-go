import path from 'path'
import React from 'react'
import { render, hydrate } from 'react-dom'
import App from './App'

const div = document.getElementById('root')
// `div.innerHTML` is empty at first time in development mode
const isHot = !!div.innerHTML
const mount = isHot ? hydrate : render

const basename = __BASENAME__
const props = __OPTIONS__
props.basepath = basename

mount(<App {...props} />, div, () => {
  if (__DEV__ && module.hot && isHot) {
    setTimeout(() => {
      const node = div.querySelector('.detected-updated')
      if (node) {
        require('./injectUpdatedCssText')
        node.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }
})

if (module.hot) module.hot.accept()
