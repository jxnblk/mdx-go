import React from 'react'
import styled from 'react-emotion'
import {
  LiveProvider,
  LivePreview,
  LiveEditor,
  LiveError,
} from 'react-live'
import {
  space,
  fontSize,
  color,
  borderColor
} from 'styled-system'
import withComponents from './withComponents'

const themed = key => props => props.theme[key]
const transformCode = src => `<React.Fragment>${src}</React.Fragment>`

const Root = styled('div')({
  border: '1px solid',
  borderRadius: '2px',
}, space, borderColor, themed('LiveCode'))

Root.defaultProps = {
  mt: 4,
  mb: 4,
  borderColor: 'lightgray'
}

const Preview = styled(LivePreview)({
}, space, themed('LivePreview'))

Preview.defaultProps = {
  p: 3
}

const Editor = styled(LiveEditor)({
  margin: 0,
  fontFamily: 'Menlo, monospace',
  outline: 'none',
},
  fontSize,
  space,
  color,
  themed('LiveEditor')
)

Editor.defaultProps = {
  fontSize: 1,
  p: 3,
  bg: 'lightgray'
}

const Err = styled(LiveError)({
  fontFamily: 'Menlo, monospace',
}, space, fontSize, color, themed('LiveError'))

Err.defaultProps = {
  fontSize: 1,
  p: 3,
  bg: 'red'
}

export const LiveCode = withComponents(({
  components,
  code,
  ...props
}) => (
  <LiveProvider
    scope={components}
    code={code}
    transformCode={transformCode}
    mountStylesheet={false}>
    <Root>
      <Preview />
      <Editor />
      <Err />
    </Root>
  </LiveProvider>
))

export default LiveCode
