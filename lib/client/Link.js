import React from 'react'
import { Link as ReachLink } from '@reach/router'
import isAbsolute from 'is-absolute-url'

export const Link = ({
  href,
  ...props
}) => isAbsolute(href)
  ? <a {...props} href={href} />
  : <ReachLink {...props} to={href} />

Link.defaultProps = {
  className: 'mdx-link'
}

export default Link
