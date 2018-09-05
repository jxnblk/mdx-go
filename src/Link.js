import React from 'react'
import { NavLink } from 'react-router-dom'
import isAbsolute from 'is-absolute-url'

export default ({
  href,
  ...props
}) => isAbsolute(href)
  ? <a {...props} href={href} />
  : <NavLink {...props} to={href} />
