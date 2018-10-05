import path from 'path'
import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'
import { routes, Root, NotFound } from './routes'
import {
  HeadProvider,
  ComponentProvider,
  ScrollTop,
} from 'superdev'

const App = ({
  fullscreen,
  headTags = [],
}) =>
  <HeadProvider tags={headTags}>
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
  </HeadProvider>

export default App
export { routes, Root, NotFound }
