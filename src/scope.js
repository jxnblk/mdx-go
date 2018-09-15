// default MDX scope
import React from 'react'
import Link from './Link'

// const code = withLiveCode('pre')

export const scope = {
  a: Link,
  pre: props => props.children,
}

export default scope
