import React from 'react'
import { Link as ReachLink } from '@reach/router'
import isAbsoluteURL from 'is-absolute-url'

export const Link = ({
  href,
  ...props
}) => isAbsoluteURL(href)
  ? <a href={href} {...props} />
  : <ReachLink to={href} {...props} />

export default Link
