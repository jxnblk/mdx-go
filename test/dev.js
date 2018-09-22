import path from 'path'
import request from 'supertest'
import dev from '../lib/dev'

describe('dev', () => {
  let server

  test('starts', async () => {
    server = await dev({
      port: 3000,
      dirname: path.join(__dirname, './__fixtures__')
    })
    expect(typeof server).toBe('object')
    expect(typeof server.address).toBe('function')
  })
})
