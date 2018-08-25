const path = require('path')
const http = require('http')
const connect = require('connect')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const chalk = require('chalk')

const config = require('./config')

config.client.entry.unshift(
  'webpack-hot-middleware/client?name=client',
)
config.client.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)
config.client.mode = 'development'

const html = (req, res) => {
  res.end(`<!DOCTYPE html>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width,initial-scale=1'>
  <style>body{margin:0;font-family:system-ui,sans-serif}</style>
  <div id=root></div>
  <script src='/main.js'></script>
  `)
}

module.exports = async opts => {
  const defs = new webpack.DefinePlugin({
    __DIRNAME__: JSON.stringify(opts.dirname)
  })

  config.client.plugins.push(defs)

  const app = connect()

  const compiler = webpack(config.client)

  const middleware = devMiddleware(compiler, {
    stats: 'errors-only',
    logLevel: 'error',
    publicPath: '/',
  })

  app.use(middleware)
  app.use(hotMiddleware(compiler, {
    name: 'client'
  }))

  app.use(html)

  return new Promise((resolve) => {
    const server = http.createServer(app)

    compiler.hooks.done.tap('mdx-go', () => {
      resolve(server)
    })

    const port = Number(opts.port)
    server.listen(port)
  })
}

