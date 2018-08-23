const devMiddleware = require('webpack-dev-middleware')

// from koa-webpack
const wrap = (compiler, dev) => (context, next) =>
  // wait for webpack-dev-middleware to signal that the build is ready
  Promise.all([
    new Promise((resolve, reject) => {
      for (const comp of [].concat(compiler.compilers || compiler)) {
        comp.hooks.failed.tap('KoaWebpack', (error) => {
          reject(error)
        })
      }

      dev.waitUntilValid(() => {
        resolve(true)
      })
    }),
    // tell webpack-dev-middleware to handle the request
    new Promise((resolve) => {
      dev(
        context.req,
        {
          end: (content) => {
            context.body = content
            resolve()
          },
          setHeader: context.set.bind(context),
          locals: context.state,
        },
        () => resolve(next())
      )
    }),
  ])

module.exports = (compiler, opts) => {
  const middleware = devMiddleware(compiler, opts)
  return wrap(compiler, middleware)
}
