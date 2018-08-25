import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export default (req, res) => {
  const router = {}
  console.log(req)
  const body = renderToString(
    <StaticRouter
      context={router}
      location={req.url}>
      <App />
    </StaticRouter>
  )
  console.log(body)

  // const route = routes.find(route => route.path === req.url)
  // let head = ''

  const html = `<!DOCTYPE html>
  <head>
    <meta charset='utf-8'>
  </head>
  <div id=root>${body}</div>
  <script src='/main.js'></script>`
  console.log(html)
  console.log(typeof res.end)

  res.end(html)
}
