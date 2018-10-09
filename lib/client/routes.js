import path from 'path'
import React from 'react'
import { Location } from '@reach/router'
import lazyComponent from './lazyComponent'
import { Link } from './Link'
import StyleProvider from './StyleProvider'
import KeyboardShortcuts from './keyboard-shortcuts.md'

const name = 'mdx-go'
const context = __STATIC__
  ? require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'sync')
  : require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'lazy')

const getSync = require.context(__DIRNAME__, false, /index\.(js|md|mdx)$/, 'sync')

export let Root = props => props.fullscreen ? props.children :
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
  <h1>Page not found</h1>

export const Directory = props =>
  <React.Fragment>
    <h1>{name}</h1>
    {props.routes
      .filter(route => route.path !== '/_')
      .map(route => (
      <div key={route.key}>
        <Link href={route.path}
          style={{
            fontWeight: 'bold',
            color: 'inherit',
          }}>
          {route.key}
        </Link>
      </div>
    ))}
    <KeyboardShortcuts />
  </React.Fragment>

export const parseRoute = (key, context) => {
  const extname = path.extname(key)
  const name = path.basename(key, extname)
  if (/^_/.test(name)) return null
  const dirname = path.dirname(key).replace(/^\./, '')
  const index = name === 'index'
  const pathname = dirname + '/' + (index ? '' : name)

  let Component = lazyComponent(() => context(key))
  let exports = {}

  if (index) {
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
    dirname,
    path: pathname,
    Component,
    ...exports
  }
}

export const [ index ] = getSync.keys()
  .map(key => parseRoute(key, getSync))
  .filter(Boolean)

const withRouter = Component => React.forwardRef((props, ref) =>
  <Location
    children={router => (
      <Component
        ref={ref}
        {...props}
        {...router}
      />
    )}
  />
)

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

const directory = {
  key: '_',
  path: '/_',
  Component: lazyComponent(() => ({ default: Directory })),
}

export const routes = [
  index,
  ...mainRoutes,
  ...subRoutes,
  directory
]

export default routes
