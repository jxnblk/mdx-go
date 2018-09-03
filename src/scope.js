// default MDX scope
import React from 'react'
import Link from './Link'
import LiveCode from './LiveCode'

// Changes .jsx fenced code blocks to LiveCode
export const withLiveCode = Component => ({
  children,
  className = '',
  ...props
}) => {
  const isLive = className === 'language-.jsx'
  if (!isLive) {
    return (
      <Component
        {...props}
        className={className}
        children={children}
      />
    )
  }

  const code = React.Children.toArray(children).join('\n')

  return (
    <LiveCode code={code} />
  )
}

const code = withLiveCode('pre')

export const scope = {
  a: Link,
  pre: props => props.children,
  code,
}

export default scope
