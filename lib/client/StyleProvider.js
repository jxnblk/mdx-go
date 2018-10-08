import React from 'react'
import MDXStyle from 'mdx-style'
import { base as baseTheme } from 'mdx-style/themes'
import scope from './scope'

const theme = {
  ...baseTheme,
  code: {
    fontFamily: 'Menlo, monospace',
    fontSize: '14px',
    padding: '1em',
    backgroundColor: '#f6f6ff',
    overflowX: 'auto',
  }
}

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
