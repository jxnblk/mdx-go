import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { MDXProvider } from '@mdx-js/tag'
import get from 'lodash.get'

const Base = styled.div([], props => ({
  fontFamily: props.theme.font,
  lineHeight: props.theme.lineHeight,
  color: get(props.theme, 'colors.text'),
  backgroundColor: get(props.theme, 'colors.background'),
}))

const Container = styled.div([], {
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '32px'
},
  props => ({
    maxWidth: get(props.theme, 'maxWidth', '768px')
  })
)

export default ({
  theme = {},
  components = {},
  children
}) =>
  <ThemeProvider theme={theme}>
    <MDXProvider components={components}>
      <Base>
        <Container>
          {children}
        </Container>
      </Base>
    </MDXProvider>
  </ThemeProvider>

