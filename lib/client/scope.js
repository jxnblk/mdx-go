import React from 'react'
import { Link } from './Link'
import lazyComponent from './lazyComponent'

const pre = lazyComponent(() => import('./LiveCode'))

export const scope = {
  a: Link,
  pre: props => props.children,
  code: pre,
}

export default scope
