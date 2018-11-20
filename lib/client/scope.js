import React from 'react'
import { Link } from './Link'
import { withMDXLive } from 'mdx-live'

const pre = withMDXLive('pre')

const heading = Tag => ({ id, children, ...props }) =>
  <Tag id={id} {...props}>
    <a
      href={'#' + id}
      style={{
        textDecoration: 'none',
        color: 'inherit'
      }}
      children={children}
    />
  </Tag>

export const scope = {
  a: Link,
  pre,
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
}

export default scope
