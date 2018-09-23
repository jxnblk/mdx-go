import path from 'path'

//const context = require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'lazy')
//const asyncLoad = require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'lazy')

const context = __STATIC__
  ? require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'sync')
  : require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'lazy')

// export const routes = context.keys().map(async key => {
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
  } = context(key) // (__STATIC__ ? context(key) : asyncLoad(key))

  // if (typeof Component !== 'function') return null

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

export default routes
