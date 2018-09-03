import React from 'react'
import styled from 'react-emotion'
import { ThemeProvider } from 'emotion-theming'
import {
  fontSize,
  fontFamily,
  color,
} from 'styled-system'
import { ComponentProvider } from './ComponentProvider'
import styledScope, { theme } from './styledScope'

const Root = styled('div')({},
  fontSize,
  fontFamily,
  color
)

Root.defaultProps = {}

export const StyleProvider = ({
  components = {},
  theme = {},
  ...props
}) =>
  <ThemeProvider theme={theme}>
    <ComponentProvider
      components={{
        ...styledScope,
        ...components
      }}>
      <Root {...props} />
    </ComponentProvider>
  </ThemeProvider>

StyleProvider.defaultProps = {
  theme
}

export default StyleProvider
