const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const chalk = require('chalk')

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

const progress = (name, color) => new ProgressBarPlugin({
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

const config = {
  client: {
    name: 'client',
    mode: 'production',
    entry: [
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
      progress('client', 'green')
    ]
  },
  server: {
    name: 'server',
    mode: 'production',
    entry: [
      path.resolve('lib/server.js')
    ],
    target: 'node',
    externals: [
      nodeExternals()
    ],
    output: {
      path: path.resolve('dist'),
      filename: 'server.js',
      libraryTarget: 'umd',
      publicPath: '/'
    },
    module: {
      rules
    },
    plugins: [
      progress('server', 'cyan')
    ]
  }
}

module.exports = config
