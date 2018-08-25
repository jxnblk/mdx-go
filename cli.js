#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const open = require('react-dev-utils/openBrowser')

const log = (...msg) => {
  console.log(
    chalk.green('[mdx-go]'),
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
  Usage:

    $ mdx-go docs

    $ mdx-go build docs

`, {
  flags: {
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
    outDir: {
      type: 'string',
      alias: 'd',
      default: 'dist'
    }
  }
})

const [ cmd, input ] = cli.input

if (!cmd && !input) {
  cli.showHelp(0)
}

const opts = Object.assign({
  dirname: path.resolve(input || cmd),
}, cli.flags)

opts.outDir = path.resolve(opts.outDir)

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
        log('bye bye')
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

require('udpate-notifier')({ pkg: cli.pkg }).notify()
