const fs = require('fs')
const path = require('path')
const test = require('ava')
const rimraf = require('rimraf')
const build = require('../lib/build')

const output = path.resolve('test/helpers')
const index = path.resolve('test/helpers/index.html')

const clean = () => {
  rimraf.sync(output)
}

test.before(clean)
test.after(clean)

test.serial('builds', async t => {
  const stats = await build({
    basename: '',
    dirname: path.join(__dirname, './fixtures'),
    outDir: output
  })
  t.is(typeof stats, 'object')
  const html = fs.readFileSync(index, 'utf8')
  t.is(typeof html, 'string')
  t.snapshot(html)
})
