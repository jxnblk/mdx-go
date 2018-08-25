const fs = require('fs')
const http = require('http')
const path = require('path')
const connect = require('connect')
const serveStatic = require('serve-static')
const webpack = require('webpack')
const createConfig = require('./config')
const HTMLPlugin = require('./html-plugin')
const renderHTML = require('./render-html')

const compile = async compiler => await new Promise((resolve, reject) => {
  compiler.hooks.done.tap('mdx-go', () => {
    resolve()
  })
  compiler.run((err, stats) => {
    if (err) {
      reject(err)
      return
    }
    console.log('done')
  })
})

module.exports = async opts => {
  const config = createConfig(opts)

  const defs = new webpack.DefinePlugin({
    __DIRNAME__: JSON.stringify(opts.dirname)
  })

  config.plugins.push(defs)

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

  return stats
}
