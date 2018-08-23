const path = require('path')
const http = require('http')
const connect = require('connect')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

const progress = ({ name, color }) => new ProgressBarPlugin({
  width: '24',
  complete: '█',
  incomplete: chalk.gray('░'),
  format: [
    chalk[color](`[${name}] :bar`),
    chalk[color](':percent'),
    chalk.gray(':elapseds :msg'),
  ].join(' '),
  summary: false,
  customSummary: () => {},
})

const babel = {
  presets: [
    'babel-preset-env',
    'babel-preset-stage-0',
    'babel-preset-react',
  ].map(require.resolve)
}
const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: babel
    }
  },
  {
    test: /\.mdx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: babel
      },
      {
        loader: '@mdx-js/loader'
      }
    ]
  }
]

const config = {
  client: {
    name: 'client',
    mode: 'development',
    entry: [
      'webpack-hot-middleware/client?name=client',
      path.resolve('lib/client.js')
    ],
    output: {
      path: path.resolve('dist'),
      filename: 'main.js',
      publicPath: '/'
    },
    module: {
      rules
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      progress({
        name: 'client',
        color: 'cyan'
      })
    ]
  },
  server: {
    name: 'server',
    mode: 'development',
    target: 'node',
    externals: [ nodeExternals() ],
    entry: [
      path.resolve('lib/server.js')
    ],
    output: {
      libraryTarget: 'umd',
      path: path.resolve('dist'),
      filename: 'server.js',
      publicPath: '/'
    },
    module: {
      rules
    },
    plugins: [
      progress({
        name: 'server',
        color: 'magenta'
      })
    ]
  }
}

let routes = () => {}

module.exports = async opts => {
  const defs = new webpack.DefinePlugin({
    __FILENAME__: JSON.stringify(opts.filename)
  })

  config.client.plugins.push(defs)
  config.server.plugins.push(defs)

  const app = connect()

  const compiler = webpack([ config.client, config.server ])

  const middleware = devMiddleware(compiler, {
    stats: 'errors-only',
    logLevel: 'error',
    publicPath: '/',
    writeToDisk: filename => /server/.test(filename)
  })

  app.use(middleware)
  app.use(hotMiddleware(compiler, {
    name: 'client'
  }))

  app.use((...args) => routes(...args))

  compiler.hooks.done.tap('mdx-go', () => {
    const mod = path.resolve('dist/server')
    delete require.cache[require.resolve(mod)]
    routes = require(mod).default
  })

  return new Promise((resolve) => {
    const server = http.createServer(app)

    compiler.hooks.done.tap('mdx-go', () => {
      resolve(server)
    })

    server.listen(3000)
  })
}

