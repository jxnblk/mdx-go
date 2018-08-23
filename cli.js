#!/usr/bin/env node
const path = require('path')
const meow = require('meow')

const cli = meow(`
  Usage:

    $ mdx-go hello.mdx

`, {
  flags: {
    port: {
      type: 'string',
      alias: 'p',
      default: '3000'
    }
  }
})

const [ cmd, input ] = cli.input

if (!cmd && !input) {
  cli.showHelp(0)
}

const opts = Object.assign({
  filename: path.resolve(input || cmd)
}, cli.flags)

switch (cmd) {
  case 'dev':
  default:
    const dev = require('./lib/dev')
    dev(opts)
      .then(server => {
        console.log('dev')
      })
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
}
