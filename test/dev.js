const path = require('path')
const test = require('ava')
const request = require('supertest')
const dev = require('../lib/dev')

let server

test.serial('starts', async t => {
  server = await dev({
    port: 3000,
    dirname: path.join(__dirname, './fixtures')
  })
  t.is(typeof server, 'object')
  t.is(typeof server.address, 'function')
})

test('returns html', async t => {
  const res = await request(server).get('/')
    .expect(200)
    .expect('Content-Type', 'text/html; charset=UTF-8')
  t.is(typeof res.text, 'string')
})

test('serves bundled.js', async t => {
  const res = await request(server).get('/main.js')
    .expect(200)
    .expect('Content-Type', 'application/javascript; charset=UTF-8')
  t.is(typeof res.text, 'string')
})
