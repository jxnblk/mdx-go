import React from 'react'
import Link from './Link'

export const scope = {
  a: Link,
  pre: props => props.children,
  code: 'pre',
}

export default scope
