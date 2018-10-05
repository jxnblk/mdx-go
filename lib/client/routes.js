import path from 'path'
import React from 'react'
import { withRouter } from 'react-router-dom'
import lazyComponent from './lazyComponent'
import Link from './Link'

// import StyleProvider from './StyleProvider'
const StyleProvider = lazyComponent(() => import('./StyleProvider'))

const context = __STATIC__
  ? require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'sync')
  : require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'lazy')

const getSync = require.context(__DIRNAME__, false, /index\.(js|md|mdx)$/, 'sync')


export let Root = props =>
  <StyleProvider
    children={props.children}
    style={{
      padding: 32,
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 768
    }}
  />

export let NotFound = (props) =>
  <React.Fragment>
    <h1>Page not found</h1>
    {props.routes.map(route => (
      <div key={route.key}>
        <Link href={route.path}>
          {route.key}
        </Link>
      </div>
    ))}
  </React.Fragment>

export const parseRoute = (key, context) => {
  const extname = path.extname(key)
  const name = path.basename(key, extname)
  if (/^_/.test(name)) return null
  const dirname = path.dirname(key).replace(/^\./, '')
  const exact = name === 'index'
  const pathname = dirname + '/' + (exact ? '' : name)

  let Component = lazyComponent(() => context(key))
  let exports = {}

  if (exact) {
    exports = context(key)
    Component = lazyComponent(() => exports)
  }

  if (name === '404') {
    NotFound = Component
    return
  }

  return {
    key,
    extname,
    name,
    exact,
    dirname,
    path: pathname,
    Component,
    ...exports
  }
}

export const [ index ] = getSync.keys()
  .map(key => parseRoute(key, getSync))
  .filter(Boolean)

if (typeof index.Root === 'function') {
  Root = withRouter(index.Root)
}

export const mainRoutes = context.keys()
  .filter(key => key !== index.key)
  .map(key => parseRoute(key, context))
  .filter(Boolean)

export const subRoutes = (typeof index.files === 'function' && index.files.keys)
  ? index.files.keys().map(key => parseRoute(key, index.files))
  : []

export const routes = [
  index,
  ...mainRoutes,
  ...subRoutes
]

export default routes
