import path from 'path'
import React from 'react'
import { Location } from '@reach/router'
import { Link } from './Link'
import StyleProvider from './StyleProvider'
import KeyboardShortcuts from './keyboard-shortcuts.md'

const name = 'mdx-go'
const context = require.context(__DIRNAME__, true, /\.(js|md|mdx)$/)

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
  const mod = context(key)

  let Component = mod.default
  let exports = {}

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

export const mainRoutes = context.keys()
  .map(key => parseRoute(key, context))
  .filter(Boolean)

const [ index ] = mainRoutes.filter(({ name }) => name === 'index')

if (typeof index.Root === 'function') {
  Root = withRouter(index.Root)
}


export const subRoutes = (typeof index.files === 'function' && index.files.keys)
  ? index.files.keys().map(key => parseRoute(key, index.files))
  : []

const directory = {
  key: '_',
  path: '/_',
  Component: Directory,
}

export const routes = [
  ...mainRoutes,
  ...subRoutes,
  directory
]

export default routes
