const fs = require('fs')
const path = require('path')
const React = require('react')
const {
  renderToString,
  renderToStaticMarkup
} = require('react-dom/server')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const resolveCWD = require('resolve-cwd')
const createConfig = require('./config')

const getApp = async opts => {
  opts.tempdir = path.join(opts.outDir, 'TEMP')

  if (!fs.existsSync(opts.outDir)) mkdirp.sync(opts.outDir)
  if (!fs.existsSync(opts.tempdir)) mkdirp.sync(opts.tempdir)

  const config = createConfig(opts)

  config.output = {
    path: opts.tempdir,
    filename: '[name].js',
    libraryTarget: 'umd'
  }
  config.entry = {
    App: path.join(__dirname, './client/App.js')
  }
  config.target = 'node'
  config.externals = [
    nodeExternals({
      whitelist: [
        'mdx-go'
      ]
    })
  ]
  config.plugins.push(
    new webpack.DefinePlugin({
      __OPTIONS__: JSON.stringify(opts),
      __DIRNAME__: JSON.stringify(opts.dirname),
      __STATIC__: JSON.stringify(true)
    })
  )

  if (opts.debug) {
    config.mode = 'development'
    config.stats = 'verbose'
  }

  const compiler = webpack(config)

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }
      const app = require(
        path.resolve(opts.tempdir, './App.js')
      )

      if (!opts.debug) {
        rimraf(opts.tempdir, err => {
          if (err) console.error(err)
        })
      }
      resolve(app)
    })
  })
}

const renderPage = (App, opts) => {
  const headTags = []
  const el = React.createElement(App, { headTags })
  const body = renderToString(el)
  const head = renderToStaticMarkup(headTags)
  return { body, head }
}

const renderHTML = async opts => {
  const { default: App } = await getApp(opts)
  const { body, head } = renderPage(App, opts)
  return Object.assign({ body, head }, opts)
}

module.exports = renderHTML
