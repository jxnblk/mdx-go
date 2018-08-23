const path = require('path')
const Koa = require('koa')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const hotClient = require('webpack-hot-client')
const devMiddleware = require('./dev-middleware')

const babel = {
}

const config = {
  client: {
    name: 'client',
    mode: 'development',
    entry: [
      path.resolve('src/client.js')
    ],
    output: {
      path: path.resolve('dist'),
      filename: 'main.js',
      publicPath: '/'
    }
  },
  server: {
    name: 'server',
    mode: 'development',
    target: 'node',
    externals: [ nodeExternals() ],
    entry: [
      path.resolve('src/server.js')
    ],
    output: {
      libraryTarget: 'umd',
      path: path.resolve('dist'),
      filename: 'server.js',
      publicPath: '/'
    }
  }
}

let routes = () => {}

module.exports = async opts => {
  const app = new Koa()
  const compiler = webpack([ config.client, config.server ])
  const middleware = devMiddleware(compiler, {
    publicPath: '/',
    writeToDisk: true // filename => /server/.test(filename)
  })
  console.log(typeof middleware)
  // const client = hotClient(compiler, {})
  /*
  const { server } = client
  server.on('listening', () => {
    console.log('hot client listening')
    // app.use(client)
    // app.listen(3000, () => {
    //   console.log('koa app listening')
    // })
    app.use((...args) => routes(...args))
  })
  */

  compiler.hooks.done.tap('dev-server', () => {
    const mod = path.resolve('dist/server')
    delete require.cache[require.resolve(mod)]
    routes = require(mod).default
    console.log('done', routes)
  })

  app.use(middleware)
  app.use((...args) => routes(...args))

  app.use(ctx => { ctx.body = 'hello' })

  app.listen(3000, () => {
    console.log('app listening')
  })
}

