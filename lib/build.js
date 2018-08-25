const fs = require('fs')
const http = require('http')
const path = require('path')
const connect = require('connect')
const serveStatic = require('serve-static')
const webpack = require('webpack')
const config = require('./config')

const compile = async compiler => await new Promise((resolve, reject) => {
  compiler.hooks.done.tap('mdx-go', () => {
    resolve()
  })
  compiler.run((err, stats) => {
    if (err) {
      console.log(err)
      reject(err)
      return
    }
    console.log('done', err, stats)
  })
})

module.exports = async opts => {
  const defs = new webpack.DefinePlugin({
    __DIRNAME__: JSON.stringify(opts.dirname)
  })

  config.client.plugins.push(defs)
  config.server.plugins.push(defs)
  const compiler = webpack([
    config.server,
    config.client
  ])
  // console.log(compiler)

  console.log('compiling')
  const stats = await compile(compiler)

  console.log('stats', stats)

  console.log(path.resolve('dist/server'))
  const routes = require(path.resolve('dist/server')).default
  const app = connect()
  app.use(serveStatic('dist'))
  app.use(routes)
  console.log('app', app)
  const server = http.createServer(app)

  // todo render all routes
  return new Promise((resolve) => {
    server.listen(3000, () => {
      console.log('server listening on 3000')
    })
  })
}
