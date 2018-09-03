import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import defaultScope from './scope'

export default ({
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
