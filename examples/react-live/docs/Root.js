import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import {
  LiveProvider,
  LivePreview,
  LiveEditor,
  LiveError
} from 'react-live'

const code = ({
  className = '',
  children
}) => {
  const lang = className.replace(/^language\-/, '')
  const isLive = lang === '.jsx'
  if (isLive) {
    const code = React.Children.toArray(children).join('\n')
    return (
      <LiveProvider
        code={code}
      >
        <LivePreview />
        <LiveEditor />
        <LiveError />
      </LiveProvider>
    )
  }

  return (
    <pre className={className} children={children} />
  )
}

const components = {
  // compensate for remark tags
  pre: props => props.children,
  code
}

export const Root = ({ children }) =>
  <MDXProvider components={components}>
    <div
      style={{
        maxWidth: 768,
        margin: 'auto',
        padding: 32
      }}>
      {children}
    </div>
  </MDXProvider>
