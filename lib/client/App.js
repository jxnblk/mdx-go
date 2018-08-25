import path from 'path'
import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import routes from './routes'
import { HeadProvider } from './Head'

const NotFound = routes.notFound.Component

const App = ({
  headTags = []
}) =>
  <HeadProvider tags={headTags}>
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
  </HeadProvider>

export default App
export { routes }

if (module.hot) module.hot.accept()
