import path from 'path'
import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

const context = require.context(__DIRNAME__, false, /.(js|md|mdx)$/)

export const routes = context.keys().map(key => {
  const extname = path.extname(key)
  const name = path.basename(key, extname)
  const exact = name === 'index'
  const pathname = '/' + (exact ? '' : name)

  const mod = context(key)
  const Component = mod.default
  if (typeof Component !== 'function') return null
  return {
    key,
    extname,
    name,
    exact,
    path: pathname,
    module: mod,
    Component,
  }
}).filter(Boolean)

routes.notFound = routes.find(route => route.name === '404')

const NotFound = routes.notFound ? routes.notFound.Component : () => 'not found'

const App = () =>
  <BrowserRouter>
    <Switch>
      {routes.map(({
        Component,
        ...route
      }) => (
        <Route
          {...route}
          component={Component}
        />
      ))}
      <Route
        component={NotFound}
      />
    </Switch>
  </BrowserRouter>

render(
  <App />,
  document.getElementById('root')
)

if (module.hot) module.hot.accept()
