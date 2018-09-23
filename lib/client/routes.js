import path from 'path'
import React from 'react'
import lazyComponent from './lazyComponent'

// todo:
// - [x] get index Root
// - [ ] get component exports

const context = __STATIC__
  ? require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'sync')
  : require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'lazy')

const getSync = require.context(__DIRNAME__, true, /index\.(js|md|mdx)$/, 'sync')

export let Root = props =>
  <div
    children={props.children}
    style={{
      padding: 32,
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 768
    }}
  />

export let NotFound = () => 'Not found'

export const routes = context.keys().map(key => {
  const extname = path.extname(key)
  const name = path.basename(key, extname)
  if (/^_/.test(name)) return null
  const dirname = path.dirname(key).replace(/^\./, '')
  const exact = name === 'index'
  const pathname = dirname + '/' + (exact ? '' : name)

  let Component = lazyComponent(() => context(key))

  if (exact) {
    const root = getSync(key)
    if (typeof root.Root === 'function') {
      Root = root.Root
    }
    Component = lazyComponent(() => root)
  }

  return {
    key,
    extname,
    name,
    exact,
    dirname,
    path: pathname,
    Component,
    // ...exports,
  }
}).filter(Boolean)

export default routes
