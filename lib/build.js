const fs = require('fs')
const http = require('http')
const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const createConfig = require('./config')
const HTMLPlugin = require('./html-plugin')
const renderHTML = require('./render-html')

const compile = async compiler => await new Promise((resolve, reject) => {
  compiler.run((err, stats) => {
    if (err) {
      reject(err)
      return
    }
    resolve(stats)
  })
})

module.exports = async opts => {
  const config = createConfig(opts)

  const defs = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(false),
    __OPTIONS__: JSON.stringify(opts),
    __DIRNAME__: JSON.stringify(opts.dirname),
    __BASENAME__: JSON.stringify(opts.basename)
  })

  config.plugins.push(defs)
  config.output.path = opts.outDir
  config.output.publicPath = opts.basename + '/'

  const pages = await renderHTML(opts)

  pages.forEach(page => {
    config.plugins.push(
      new HTMLPlugin({
        filename: page.path + '/index.html',
        context: page
      })
    )
  })

  const compiler = webpack(config)

  const stats = await compile(compiler)

  if (opts.static) {
    const bundle = path.join(opts.outDir, './main.js')
    rimraf(bundle, err => {
      if (err) console.error(err)
    })
  }

  return stats
}
