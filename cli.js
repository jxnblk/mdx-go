#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const open = require('react-dev-utils/openBrowser')
const findUp = require('find-up')

const config = require('pkg-conf').sync('blazin')
const { pkg } = require('read-pkg-up').sync()

const log = (...msg) => {
  console.log(
    chalk.green('[blazin]'),
    ...msg
  )
}

log.error = (...msg) => {
  console.log(
    chalk.red('[err]'),
    ...msg
  )
}

const cli = meow(`
  ${chalk.gray('Usage')}

    ${chalk.gray('$')} ${chalk.green('blazin docs')}

    ${chalk.gray('$')} ${chalk.green('blazin build docs')}

  ${chalk.gray('Options')}

    -p --port     Port for dev server
    --no-open     Disable opening in default browser
    --fullscreen  Disable default centered layout

    -d --out-dir  Output directory for static export
    --basename    Base path for routing
    --static      Export HTML without JS bundle
    --webpack     Path to custom webpack config

`, {
  description: chalk.red('🔥 blazin') + ' Zero-config MDX-based dev server for progressive documentation',
  flags: {
    help: {
      type: 'boolean',
      alias: 'h'
    },
    version: {
      type: 'boolean',
      alias: 'v'
    },
    port: {
      type: 'string',
      alias: 'p',
      default: '8080'
    },
    open: {
      type: 'boolean',
      alias: 'o',
      default: true
    },
    fullscreen: {
      type: 'boolean'
    },
    outDir: {
      type: 'string',
      alias: 'd',
      default: 'dist'
    },
    basename: {
      type: 'string'
    },
    static: {
      type: 'boolean'
    },
    webpack: {
      type: 'string'
    },
    debug: {
      type: 'boolean'
    }
  }
})

require('update-notifier')({ pkg: cli.pkg }).notify()

const [ cmd, input ] = cli.input

if (!cmd && !input) {
  cli.showHelp(0)
}

const opts = Object.assign({
  pkg,
  dirname: path.resolve(input || cmd),
  basename: '',
  webpack: findUp.sync('webpack.config.js'),
}, config, cli.flags)

opts.outDir = path.resolve(opts.outDir)

if (!opts.cssLibrary && pkg && pkg.dependencies) {
  const deps = Object.assign({}, pkg.devDependencies, pkg.dependencies)
  if (deps['styled-components']) {
    opts.cssLibrary = 'styled-components'
  } else if (deps['emotion']) {
    opts.cssLibrary = 'emotion'
  }
}

if (opts.webpack) {
  opts.webpack = require(path.resolve(opts.webpack))
}

switch (cmd) {
  case 'build':
    log('building...')
    const build = require('./lib/build')
    build(opts)
      .catch(err => {
        log.error(err)
        process.exit(1)
      })
      .then(stats => {
        log('built', chalk.gray(opts.outDir))
      })
    break
  case 'dev':
  default:
    log('starting dev server...')
    const dev = require('./lib/dev')
    dev(opts)
      .then(server => {
        const { port } = server.address()
        const url = `http://localhost:${port}`
        log('listening on', chalk.green(url))
        if (opts.open) open(url)
      })
      .catch(err => {
        log.error(err)
        process.exit(1)
      })
}

