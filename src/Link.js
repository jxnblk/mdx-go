import React from 'react'
import { Link } from 'react-router-dom'
import isAbsolute from 'is-absolute-url'

export default ({
  href,
  ...props
}) => isAbsolute(href)
  ? <a {...props} href={href} />
  : <Link {...props} to={href} />
