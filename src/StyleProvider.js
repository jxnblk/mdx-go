import React from 'react'
import styled from 'react-emotion'
import {
  fontSize,
  fontFamily,
  color,
} from 'styled-system'
import { ComponentProvider } from './ComponentProvider'
import styledScope from './styledScope'

const Root = styled('div')({},
  fontSize,
  fontFamily,
  color
)

Root.defaultProps = {}

export const StyleProvider = ({
  components = {},
  ...props
}) =>
  <ComponentProvider
    components={{
      ...styledScope,
      ...components
    }}>
    <Root {...props} />
  </ComponentProvider>

export default StyleProvider
