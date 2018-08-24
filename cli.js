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
    }
  }
})

const [ cmd, input ] = cli.input

if (!cmd && !input) {
  cli.showHelp(0)
}

const opts = Object.assign({
  dirname: path.resolve(input || cmd)
}, cli.flags)

switch (cmd) {
  case 'dev':
  default:
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
