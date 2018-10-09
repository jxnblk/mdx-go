import React from 'react'
import MDXStyle from 'mdx-style'
import { base as theme } from 'mdx-style/themes'
import scope from './scope'

export const StyleProvider = ({
  components = {},
  ...props
}) =>
  <MDXStyle
    components={{
      ...scope,
      ...components
    }}
    css={theme}
    {...props}
  />

export default StyleProvider
