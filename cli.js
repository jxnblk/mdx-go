#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const open = require('react-dev-utils/openBrowser')

const config = require('pkg-conf').sync('mdx-go')
const { pkg } = require('read-pkg-up').sync()

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
  ${chalk.gray('Usage')}

    ${chalk.gray('$')} ${chalk.green('mdx-go docs')}

    ${chalk.gray('$')} ${chalk.green('mdx-go build docs')}

  ${chalk.gray('Options')}

    -p --port     Port for dev server
    --no-open     Disable opening in default browser

    -d --out-dir  Output directory for static export
    --basename    Base path for routing

`, {
  description: chalk.green('mdx-go') + ' Lightning fast MDX-based dev server',
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
    outDir: {
      type: 'string',
      alias: 'd',
      default: 'dist'
    },
    basename: {
      type: 'string'
    }
  }
})

const [ cmd, input ] = cli.input

if (!cmd && !input) {
  cli.showHelp(0)
}

const opts = Object.assign({
  pkg,
  dirname: path.resolve(input || cmd),
}, config, cli.flags)

opts.outDir = path.resolve(opts.outDir)

if (pkg && pkg.dependencies) {
  if (pkg.dependencies['styled-components']) {
    opts.cssLibrary = 'styled-components'
  } else if (pkg.dependencies['emotion']) {
    opts.cssLibrary = 'emotion'
  }
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

require('update-notifier')({ pkg: cli.pkg }).notify()
