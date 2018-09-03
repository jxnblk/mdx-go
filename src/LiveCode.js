import React from 'react'
import styled from 'react-emotion'
import {
  LiveProvider,
  LivePreview,
  LiveEditor,
  LiveError,
} from 'react-live'
import withComponents from './withComponents'

const themed = key => props => props.theme[key]
const transformCode = src => `<React.Fragment>${src}</React.Fragment>`

const Root = styled('div')([], themed('LiveCode'))
const Preview = styled(LivePreview)([], themed('LivePreview'))
const Editor = styled(LiveEditor)([], {
  margin: 0,
  fontFamily: 'Menlo, monospace',
  fontSize: '13px'
},
  themed('LiveEditor')
)
const Err = styled(LiveError)([], themed('LiveError'))

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
