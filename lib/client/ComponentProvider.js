import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import defaultScope from './scope'

export const ComponentProvider = ({
  components,
  ...props
}) =>
  <MDXProvider
    components={{
      ...defaultScope,
      ...components
    }}>
    <React.Fragment>
      {props.children}
    </React.Fragment>
  </MDXProvider>

export default ComponentProvider
