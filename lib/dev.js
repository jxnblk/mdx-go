const path = require('path')
const http = require('http')
const connect = require('connect')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const chalk = require('chalk')

const HTMLPlugin = require('./html-plugin')
const createConfig = require('./config')

const config = createConfig()

config.entry.unshift(
  'webpack-hot-middleware/client?name=client',
)
config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)
config.mode = 'development'

module.exports = async opts => {
  const defs = new webpack.DefinePlugin({
    __DIRNAME__: JSON.stringify(opts.dirname)
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

  app.use(middleware)
  app.use(hotMiddleware(compiler, {}))

  return new Promise((resolve) => {
    const server = http.createServer(app)

    compiler.hooks.done.tap('mdx-go', () => {
      resolve(server)
    })

    const port = Number(opts.port)
    server.listen(port)
  })
}
