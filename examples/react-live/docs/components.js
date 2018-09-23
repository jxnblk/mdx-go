import React from 'react'
import { ComponentProvider, Layout } from 'mdx-go'
import {
  LiveProvider,
  LivePreview,
  LiveEditor,
  LiveError
} from 'react-live'

const code = props => {
  const isLive = props.className.includes('language-.jsx')
  if (!isLive) return <pre {...props} />
  const code = React.Children.toArray(props.children).join('')

  return (
    <LiveProvider
      code={code}
      mountStylesheet={false}
    >
      <LivePreview />
      <LiveEditor />
      <LiveError />
    </LiveProvider>
  )
}

const components = {
  code,
}

export const Root = props =>
  <ComponentProvider components={components}>
    <Layout.Main>
      {props.children}
    </Layout.Main>
  </ComponentProvider>

