const path = require('path')
const http = require('http')
const connect = require('connect')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

const progress = new ProgressBarPlugin({
  width: '24',
  complete: '█',
  incomplete: chalk.gray('░'),
  format: [
    chalk.green(`[mdx-go] :bar`),
    chalk.green(':percent'),
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
  name: 'client',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?name=client',
    path.resolve('lib/client.js')
  ],
  output: {
    path: path.resolve('dev'),
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    progress
  ]
}

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

  config.plugins.push(defs)

  const app = connect()

  const compiler = webpack(config)

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

