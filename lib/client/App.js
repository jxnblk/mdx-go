import path from 'path'
import React from 'react'
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import { MDXProvider } from '@mdx-js/tag'
import get from 'lodash.get'
import routes from './routes'
import { Link, HeadProvider } from 'mdx-go'

const components = {
  a: Link
}

const DefaultLayout = props => props.disabled ? props.children :
  <div
    children={props.children}
    style={{
      padding: 32,
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 768
    }}
  />

const NotFound = routes.notFound.Component
const Root = withRouter(get(routes, 'index.module.Root', DefaultLayout))

const App = ({
  fullscreen,
  headTags = []
}) =>
  <HeadProvider tags={headTags}>
    <MDXProvider components={components}>
      <Root
        routes={routes}
        disabled={fullscreen}>
        <Switch>
          {routes.map(({
            Component,
            ...route
          }) => (
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
    </MDXProvider>
  </HeadProvider>

export default App
export { routes }
