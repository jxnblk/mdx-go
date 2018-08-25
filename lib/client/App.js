import path from 'path'
import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import routes from './routes'

const NotFound = routes.notFound.Component

const App = () =>
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

export default App

if (module.hot) module.hot.accept()
