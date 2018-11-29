import React from 'react'
import styled from '@emotion/styled'
import ComponentProvider from './ComponentProvider'

const breakpoint = '@media screen and (min-width: 40em)'
const monospace = 'Menlo, monospace'
const lightgray = '#f6f6ff'
const gray = '#e6e6ef'

const Root = styled.div({
  padding: '32px',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '768px',
  h1: {
    fontSize: '32px',
    lineHeight: 1.25,
    [breakpoint]: {
      fontSize: '48px',
    }
  },
  h2: {
    fontSize: '24px',
    lineHeight: 1.25,
    [breakpoint]: {
      fontSize: '32px',
    }
  },
  h3: {
    fontSize: '20px',
    lineHeight: 1.25,
  },
  h4: {
    fontSize: '16px',
    lineHeight: 1.25,
  },
  h5: {
    fontSize: '14px',
    lineHeight: 1.25,
  },
  h6: {
    fontSize: '12px',
    lineHeight: 1.25,
  },

  p: {
  },

  code: {
    fontFamily: monospace,
    fontSize: '87.5%',
    overflowX: 'auto',
    backgroundColor: lightgray,
  },
  pre: {
    fontFamily: monospace,
    fontSize: '87.5%',
    padding: '16px',
    overflowX: 'auto',
    backgroundColor: lightgray,
  },

  blockquote: {
    fontSize: '24px',
    marginLeft: 0,
    marginRight: 0,
    marginTop: '32px',
    marginBottom: '32px',
  },

  img: {
    maxWidth: '100%',
    height: 'auto',
  },

  hr: {
    border: 0,
    height: '2px',
    backgroundColor: gray,
  },

  ul: {},
  ol: {},
  li: {},

  table: {
    width: '100%',
    marginTop: '32px',
    marginBottom: '32px',
    borderCollapse: 'separate',
    borderSpacing: 0,
    borderColor: gray,
    '& th': {
      textAlign: 'left',
      verticalAlign: 'bottom',
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingRight: '4px',
      paddingLeft: 0,
      borderColor: 'inherit',
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid'
    },
    '& td': {
      textAlign: 'left',
      verticalAlign: 'top',
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingRight: '4px',
      paddingLeft: 0,
      borderColor: 'inherit',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid'
    },
  },
})

export default props =>
  <ComponentProvider>
    <Root {...props} />
  </ComponentProvider>
