import React from 'react'
import MDXStyle from 'mdx-style'
import { base as baseTheme } from 'mdx-style/themes'
import defaultScope from './scope'

const heading = Tag => ({ id, children, ...props }) =>
  <Tag id={id} {...props}>
    <a
      href={'#' + id}
      style={{
        textDecoration: 'none',
        color: 'inherit'
      }}
      children={children}
    />
  </Tag>

const scope = {
  ...defaultScope,
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
  pre: props => props.children,
  // code: ({ metaString, ...props }) => <pre {...props} />,
}

const theme = {
  ...baseTheme,
  code: {
    fontFamily: 'Menlo, monospace',
    fontSize: '14px',
    padding: '1em',
    // margin: 0,
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
