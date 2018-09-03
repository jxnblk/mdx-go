import path from 'path'

const context = require.context(__DIRNAME__, true, /\.(js|md|mdx)$/)

export const routes = context.keys().map(key => {
  const extname = path.extname(key)
  const name = path.basename(key, extname)
  if (/^_/.test(name)) return null
  const dirname = path.dirname(key).replace(/^\./, '')
  const exact = name === 'index'
  const pathname = dirname + '/' + (exact ? '' : name)

  const {
    default: Component,
    Component: _Component,
    ...exports
  } = context(key)

  if (typeof Component !== 'function') return null

  return {
    key,
    extname,
    name,
    exact,
    dirname,
    path: pathname,
    ...exports,
    Component,
  }
}).filter(Boolean)

routes.index = routes.find(route => route.path === '/')
routes.notFound = routes.find(route => route.name === '404') || {
  Component: () => 'not found'
}

export default routes
