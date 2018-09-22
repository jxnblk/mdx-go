const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const chalk = require('chalk')
const merge = require('webpack-merge')
const mdPlugins = [
  require('remark-emoji'),
  require('remark-images'),
  require('remark-autolink-headings'),
  require('remark-slug'),
  require('remark-unwrap-images'),
]

const babel = {
  babelrc: false,
  presets: [
    [ require.resolve('@babel/preset-env'), { modules: false } ],
    // require.resolve('babel-preset-stage-0'),
    require.resolve('@babel/preset-react'),
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-export-default-from',
    '@babel/proposal-export-namespace-from',
    '@babel/syntax-dynamic-import',
  ]
}

const rules = [
  {
    test: /\.mjs$/,
    type: 'javascript/auto'
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: require.resolve('babel-loader'),
      options: babel
    }
  },
  {
    test: /\.js$/,
    exclude: path.join(__dirname, '../node_modules'),
    include: [
      path.join(__dirname, './lib'),
      __dirname,
      path.join(__dirname, '..')
    ],
    use: {
      loader: require.resolve('babel-loader'),
      options: babel
    }
  },
  {
    test: /\.mdx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: babel
      },
      {
        loader: require.resolve('@mdx-js/loader'),
        options: {
          mdPlugins
        }
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

const createConfig = (opts = {}) => merge.smart(({
  name: 'mdx-go',
  context: __dirname,
  mode: 'production',
  stats: 'errors-only',
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
      'mdx-go': path.resolve(__dirname, '..'),
      'webpack-hot-middleware/client': path.resolve(require.resolve('webpack-hot-middleware/client'))
    },
    modules: [
      __dirname,
      path.join(__dirname, '../node_modules'),
      path.relative(process.cwd(), path.join(__dirname, '../node_modules')),
      'node_modules'
    ]
  },
  plugins: [
    // progress('mdx-go', 'green')
    new ProgressBarPlugin({
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
  ]
}), opts.webpack)

module.exports = createConfig
