// based on mini-html-webpack-plugin
const path = require('path')
const { RawSource } = require('webpack-sources')

class HTMLPlugin {
  constructor (options = {}) {
    this.options = options
    this.plugin = this.plugin.bind(this)
  }

  plugin (compilation, callback) {
    const { publicPath } = compilation.options.output
    const {
      filename = 'index.html',
      template = defaultTemplate,
      context
    } = this.options

    const files = getFiles(compilation.entrypoints)
    const chunks = getChunks(compilation.chunks)
    const links = generateCSSReferences(files.css, publicPath)
    const scripts = generateJSReferences(files.js, publicPath)
    const ctx = Object.assign({}, files, {
      publicPath,
      links,
      scripts
    }, context)

    compilation.assets[filename] = new RawSource(
      template(ctx)
    )

    callback()
  }

  apply (compiler) {
    compiler.hooks.emit.tapAsync('MDXGoHtmlPlugin', this.plugin)
  }
}

const getFiles = (entrypoints) => {
  const files = {}

  entrypoints.forEach(entry => {
    entry.getFiles().forEach(file => {
      const extension = path.extname(file).replace(/\./, '')

      if (!files[extension]) {
        files[extension] = []
      }

      files[extension].push(file)
    })
  })

  return files
}

const getChunks = (chunks) => {
  const obj = {}

  chunks.forEach(chunk => {
    chunk.files.forEach(file => {
      const extension = path.extname(file).replace(/\./, '')
      if (!obj[extension]) {
        obj[extension] = []
      }
      obj[extension].push(file)
    })
  })

  return obj
}

const defaultTemplate = ({
  links,
  scripts,
  title = '',
  body = '',
  head = '',
  css = '',
  static: noScript,
  publicPath
}) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1'>
    <style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif}</style>
    ${head}${css}${links}
  </head>
  <body>
    <div id=root>${body}</div>
    ${noScript ? '' : scripts}
  </body>
</html>`

const generateCSSReferences = (files = [], publicPath = '') => files
  .map(file => `<link href='${publicPath + file}' rel='stylesheet'>`)
  .join('')

const generateJSReferences = (files = [], publicPath = '') => files
  .map(file => `<script src='${publicPath + file}'></script>`)
  .join('')

module.exports = HTMLPlugin
module.exports.template = defaultTemplate
