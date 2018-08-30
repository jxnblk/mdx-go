import path from 'path'
import React from 'react'
import {
  Route,
  Switch
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
  fullscreen,
  headTags = []
}) =>
  <HeadProvider tags={headTags}>
    <MDXProvider components={components}>
      <Layout disabled={fullscreen}>
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
