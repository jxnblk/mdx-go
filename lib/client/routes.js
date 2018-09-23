import path from 'path'
import lazyComponent from './lazyComponent'

// todo:
// - [ ] get index Root
// - [ ] get component exports

const context = __STATIC__
  ? require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'sync')
  : require.context(__DIRNAME__, true, /\.(js|md|mdx)$/, 'lazy')

export const routes = context.keys().map(key => {
  const extname = path.extname(key)
  const name = path.basename(key, extname)
  if (/^_/.test(name)) return null
  const dirname = path.dirname(key).replace(/^\./, '')
  const exact = name === 'index'
  const pathname = dirname + '/' + (exact ? '' : name)

    /*
  const {
    default: Component,
    Component: _Component,
    ...exports
  } = context(key)
  */

  // if (typeof Component !== 'function') return null

  return {
    key,
    extname,
    name,
    exact,
    dirname,
    path: pathname,
    // ...exports,
    Component: lazyComponent(() => context(key)),
  }
}).filter(Boolean)

export default routes
