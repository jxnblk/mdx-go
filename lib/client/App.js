import path from 'path'
import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import { MDXProvider } from '@mdx-js/tag'
import get from 'lodash.get'
import routes from './routes'
import { HeadProvider } from './Head'
import Link from './Link'

const components = {
  a: Link
}

const DefaultLayout = props =>
  <div
    {...props}
    style={{
      padding: 32,
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 768
    }}
  />

const NotFound = routes.notFound.Component
const Layout = get(routes, 'index.module.Root', DefaultLayout)

const App = ({
  headTags = []
}) =>
  <HeadProvider tags={headTags}>
    <MDXProvider components={components}>
      <Layout>
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
      </Layout>
    </MDXProvider>
  </HeadProvider>

export default App
export { routes }
