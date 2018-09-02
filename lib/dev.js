const path = require('path')
const http = require('http')
const connect = require('connect')
const webpack = require('webpack')
const history = require('connect-history-api-fallback')
const serveStatic = require('serve-static')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const chalk = require('chalk')

const HTMLPlugin = require('./html-plugin')
const createConfig = require('./config')

module.exports = async opts => {
  const config = createConfig(opts)
  const hotPort = parseInt(opts.port, 10) + 1

  config.entry.unshift(
    'webpack-hot-middleware/client',
    path.join(__dirname, './client/overlay.js')
  )
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
  config.mode = 'development'

  const defs = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(true),
    __OPTIONS__: JSON.stringify(opts),
    __DIRNAME__: JSON.stringify(opts.dirname),
    __BASENAME__: JSON.stringify(''),
    __HOT_PORT__: JSON.stringify(hotPort),
  })

  config.plugins.push(defs)

  config.plugins.push(
    new HTMLPlugin()
  )

  const app = connect()

  const compiler = webpack(config)

  const middleware = devMiddleware(compiler, {
    stats: 'errors-only',
    logLevel: 'error',
    publicPath: '/',
  })

  app.use(history())
  app.use(serveStatic(opts.dirname))
  app.use(middleware)
  app.use(hotMiddleware(compiler, {
    log: false,
    port: hotPort
  }))

  return new Promise((resolve) => {
    const server = http.createServer(app)

    compiler.hooks.done.tap('mdx-go', () => {
      resolve(server)
    })

    const port = Number(opts.port)
    server.listen(port)
  })
}
