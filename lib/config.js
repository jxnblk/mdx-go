const path = require('path')
const WebpackBar = require('webpackbar')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
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
    require.resolve('@babel/preset-react'),
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
  ].map(require.resolve)
}

const rules = [
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
    include: [ process.cwd(), __dirname, ],
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
      'mdx-go': path.resolve(__dirname, './client/components'),
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
    new WebpackBar({
      name: '[mdx-go]'
    }),
    new FriendlyErrorsPlugin(),
  ]
}), opts.webpack)

module.exports = createConfig
