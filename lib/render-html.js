const fs = require('fs')
const path = require('path')
const React = require('react')
const {
  renderToString,
  renderToStaticMarkup
} = require('react-dom/server')
const { StaticRouter } = require('react-router-dom')
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
      __DIRNAME__: JSON.stringify(opts.dirname)
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

const renderPage = (App, path, opts) => {
  let body, css, head
  const headTags = []
  const el = React.createElement(StaticRouter, {
    basename: opts.basename,
    location: path,
    context: {}
  },
    React.createElement(App, { headTags })
  )
  switch (opts.cssLibrary) {
    case 'styled-components':
      const { ServerStyleSheet } = require(resolveCWD('styled-components'))
      const sheet = new ServerStyleSheet()
      body = renderToString(
        sheet.collectStyles(el)
      )
      css = sheet.getStyleTags()
      break
    case 'emotion':
      const { renderStylesToString } = require(resolveCWD('emotion-server'))
      body = renderStylesToString(renderToString(el))
      break
    default:
      body = renderToString(el)
      break
  }
  head = renderToStaticMarkup(headTags)
  return { body, css, head }
}

const renderHTML = async opts => {
  const { default: App, routes } = await getApp(opts)
  const headTags = []
  const router = {}
  const pages = routes.map(route => {
    const { body, css, head } = renderPage(App, route.path, opts)
    return Object.assign({ body, head, css }, opts, route)
  })
  return pages
}

module.exports = renderHTML
