const path = require('path')
const http = require('http')
const connect = require('connect')
const webpack = require('webpack')
const history = require('connect-history-api-fallback')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const chalk = require('chalk')

const HTMLPlugin = require('./html-plugin')
const createConfig = require('./config')

const config = createConfig()

config.entry.unshift(
  'webpack-hot-middleware/client',
)
config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)
config.mode = 'development'

module.exports = async opts => {
  const defs = new webpack.DefinePlugin({
    __DIRNAME__: JSON.stringify(opts.dirname),
    __BASENAME__: JSON.stringify(opts.basename)
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
  app.use(middleware)
  app.use(hotMiddleware(compiler, {
    log: false,
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
