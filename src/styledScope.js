import React from 'react'
import styled from 'react-emotion'
import {
  space,
  fontSize,
  color,
} from 'styled-system'
import Link from './Link'
import { withLiveCode } from './scope'

const css = props => props.css
const themed = key => props => props.theme[key]

const BlockLink = styled('a')({
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
})

const heading = Tag => ({
  id,
  children,
  ...props
}) =>
  <Tag id={id} {...props}>
    <BlockLink href={'#' + id}>
      {children}
    </BlockLink>
  </Tag>

const createHeading = (tag, defaultProps = {}) => {
  const Heading = styled(heading(tag))({},
    space,
    fontSize,
    color,
    themed(tag)
  )
  Heading.defaultProps = defaultProps
  return Heading
}

const createComponent = (tag, styles, defaultProps = {}) => {
  const Component = styled(tag)(styles, space, fontSize, color, themed(tag))
  Component.defaultProps = defaultProps
  return Component
}

export const h1 = createHeading('h1', { mt: 4, mb: 2, fontSize: [ 5, null, 6 ] })
export const h2 = createHeading('h2', { mt: 4, mb: 2, fontSize: [ 4, null, 5 ] })
export const h3 = createHeading('h3', { mt: 4, mb: 2, fontSize: [ 3 ] })
export const h4 = createHeading('h4', { mt: 4, mb: 2, fontSize: [ 2 ] })
export const h5 = createHeading('h5', { mt: 4, mb: 2, fontSize: [ 1 ] })
export const h6 = createHeading('h6', { mt: 4, mb: 2, fontSize: [ 0 ] })

export const a = styled(Link)({}, themed('a'))

export const p = createComponent('p', {
  lineHeight: 1.625,
}, {
  mt: 3,
  mb: 4,
})

export const img = createComponent('img', {
  maxWidth: '100%',
  height: 'auto',
})

export const blockquote = createComponent('blockquote', {}, {
  mt: 5,
  mb: 5,
  mx: 0,
  px: 3,
  fontSize: 3,
})

export const hr = createComponent('hr', {
  border: 0,
  height: '2px'
}, {
  mx: 0,
  bg: 'lightgray'
})

export const ul = createComponent('ul', {
  lineHeight: 1.625,
}, {
  pl: 3,
  mt: 3,
  mb: 4,
})

export const ol = createComponent('ol', {
  lineHeight: 1.625,
}, {
  pl: 3,
  mt: 3,
  mb: 4,
})

export const table = createComponent('table', {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  borderColor: 'lightgray',
  '& th': {
    textAlign: 'left',
    verticalAlign: 'bottom',
  },
  '& td': {
    verticalAlign: 'top',
  },
  '& td, & th': {
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '0px',
    paddingRight: '16px',
    borderColor: 'inherit',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
  }
}, {
  mt: 4,
  mb: 4,
})

export const pre = createComponent('pre', {
  fontFamily: 'Menlo, monospace',
  borderRadius: '2px'
}, {
  fontSize: 1,
  p: 3,
  mt: 4,
  mb: 4,
  bg: 'lightgray',
})

export const code = createComponent('code', {
  fontFamily: 'Menlo, monospace'
}, {})

// todo: for checklists
export const Checkbox = styled('input')({})
Checkbox.defaultProps = {
  type: 'checkbox'
}

export const input = props => {
  if (props.type === 'checkbox') {
    return <Checkbox {...props} />
  }
  return <input {...props} />
}

export const theme = {
  colors: {
    lightgray: '#f6f6f6'
  }
}

export const styledScope = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  img,
  p,
  ul,
  ol,
  blockquote,
  hr,
  table,
  // todo
  code: withLiveCode(pre),
  inlineCode: code,
  // input,
}

export default styledScope
