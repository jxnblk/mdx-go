const fs = require('fs')
const http = require('http')
const path = require('path')
const connect = require('connect')
const serveStatic = require('serve-static')
const webpack = require('webpack')
const createConfig = require('./config')
const HTMLPlugin = require('./html-plugin')

const compile = async compiler => await new Promise((resolve, reject) => {
  compiler.hooks.done.tap('mdx-go', () => {
    resolve()
  })
  compiler.run((err, stats) => {
    if (err) {
      reject(err)
      return
    }
    console.log('done', err, stats)
  })
})

module.exports = async opts => {
  const config = createConfig(opts)

  const defs = new webpack.DefinePlugin({
    __DIRNAME__: JSON.stringify(opts.dirname)
  })

  config.plugins.push(defs)
  config.plugins.push(
    new HTMLPlugin()
  )

  // todo: getNodeApp
  // getHTML
  // getRoutes

  const compiler = webpack(config)

  const stats = await compile(compiler)

  return stats
}
