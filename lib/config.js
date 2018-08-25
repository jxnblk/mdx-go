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
    test: /\.js$/,
    exclude: path.join(__dirname, '../node_modules'),
    include: [
      path.join(__dirname, './lib'),
      path.join(__dirname, '..')
    ],
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

const createConfig = opts => ({
  name: 'client',
  mode: 'production',
  entry: [
    path.join(__dirname, './client/index.js')
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules
  },
  resolve: {
    alias: {
      'webpack-hot-middleware/client': path.resolve(require.resolve('webpack-hot-middleware/client'))
    }
  },
  plugins: [
    progress('mdx-go', 'green')
  ]
})

module.exports = createConfig
