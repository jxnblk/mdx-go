import path from 'path'
import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'
import { MDXProvider } from '@mdx-js/tag'
import get from 'lodash.get'
import { routes, Root, NotFound } from './routes'
import {
  HeadProvider,
  ComponentProvider,
  ScrollTop
} from 'blazin'

const App = ({
  fullscreen,
  headTags = [],
}) =>
  <HeadProvider tags={headTags}>
    <ComponentProvider>
      <Root routes={routes}>
        <Switch>
          {routes.map(({
            Component,
            ...route
          }) => Component && (
            <Route
              {...route}
              render={(router) => (
                <Component
                  {...router}
                  routes={routes}
                />
              )}
            />
          ))}
          <Route
            render={(router) => (
              <NotFound
                {...router}
                routes={routes}
              />
            )}
          />
        </Switch>
      </Root>
      <ScrollTop />
    </ComponentProvider>
  </HeadProvider>

export default App
export { routes, Root, NotFound }
