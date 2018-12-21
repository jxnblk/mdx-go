import React from 'react'
import { HeadProvider } from './Head'

// single page
// todo: rename to FILENAME
// const context = require.context(__FILENAME__, false, /\.(js|md|mdx)$/, 'sync')

const mod = require(__FILENAME__)
const Component = mod.default

// todo
const Root = props => props.children

const App = ({
  headTags = []
}) =>
  <HeadProvider tags={headTags}>
    <Root>
      {/* todo */}
      <Component />
    </Root>
  </HeadProvider>

export default App

// public API
export { Head } from './Head'
