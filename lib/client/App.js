import path from 'path'
import React from 'react'
import {
  Router,
} from '@reach/router'
import { routes, Root, NotFound } from './routes'
import {
  HeadProvider,
  ComponentProvider,
} from 'mdx-go'
import Keyboard from './Keyboard'

const App = ({
  basepath = '',
  keyboard,
  fullscreen,
  headTags = [],
}) =>
  <HeadProvider tags={headTags}>
    <Root
      routes={routes}
      fullscreen={fullscreen}>
      <Router basepath={basepath}>
        {routes.map(({
          Component,
          ...route
        }) => Component && (
          <Component
            {...route}
            path={route.path}
            routes={routes}
            default={undefined}
          />
        ))}
        <NotFound
          default
          routes={routes}
        />
      </Router>
    </Root>
    {keyboard && <Keyboard />}
  </HeadProvider>

export default App
export { routes, Root, NotFound }
