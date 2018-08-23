import React from 'react'
import { renderToString } from 'react-dom/server'

const App = require(__FILENAME__).default

export default (req, res) => {
  const body = renderToString(
    <App />
  )

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1'>
  </head>
  <body>
    <div id=root>${body}</div>
    <script src='/main.js'></script>
  </body>
  `
  res.end(html)
}
