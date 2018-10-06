import path from 'path'
import React from 'react'
import {
  Router,
} from '@reach/router'
import { routes, Root, NotFound } from './routes'
import {
  HeadProvider,
  ComponentProvider,
} from 'superdev'

const Index = () => <h1>Index</h1>

const App = ({
  basepath = '',
  fullscreen,
  headTags = [],
}) => {
  console.log(routes)
  return (
  <HeadProvider tags={headTags}>
    <Root routes={routes}>
      <Router>
        {routes.map(({
          Component,
          ...route
        }) => Component && (
          <Component
            {...route}
            path={route.path}
            routes={routes}
          />
        ))}
        <NotFound
          default
          routes={routes}
        />
      </Router>
    </Root>
  </HeadProvider>
  )
}

export default App
export { routes, Root, NotFound }
