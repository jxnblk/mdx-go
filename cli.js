#!/usr/bin/env node
const path = require('path')
const meow = require('meow')

const cli = meow(``, {})

const dev = require('./lib/dev')

dev()
  .then(server => {
    console.log('dev')
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
