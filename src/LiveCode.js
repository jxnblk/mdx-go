import React from 'react'
import {
  LiveProvider,
  LivePreview,
  LiveEditor,
  LiveError,
} from 'react-live'
import withComponents from './withComponents'

const themed = key => props => props.theme[key]
const transformCode = src => `<React.Fragment>${src}</React.Fragment>`

const Root = props =>
  <div
    {...props}
    style={{
      marginTop: 'var(--live-margin-top, 32px)',
      marginBottom: 'var(--live-margin-bottom, 32px)',
      border: '1px solid var(--live-border, #f3f3f3)',
      borderRadius: 'var(--live-radius, 2px)',
    }}
  />

const Preview = props =>
  <LivePreview
    {...props}
    style={{
      padding: 'var(--live-padding, 16px)'
    }}
  />

const Editor = props =>
  <LiveEditor
    {...props}
    style={{
      margin: 0,
      fontFamily: 'var(--live-editor-font, Menlo, monospace)',
      fontSize: 'var(--live-editor-font-size, 14px)',
      padding: 'var(--live-padding, 16px)',
      backgroundColor: 'var(--live-editor-background, #f9f9f9)',
      outline: 'none',
    }}
  />

const Err = props =>
  <LiveError
    {...props}
    style={{
      fontFamily: 'var(--live-error-font, Menlo, monospace)',
      fontSize: 'var(--live-error-font-size, 14px)',
      padding: 'var(--live-padding, 16px)',
      color: 'var(--live-error-color, white)',
      backgroundColor: 'var(--live-error-background, red)'
    }}
  />

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
