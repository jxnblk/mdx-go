import React from 'react'

export const createStyle = theme => {
  const style = {}
  for (const key in theme) {
    style['--' + key] = theme[key]
  }
  return style
}

export default ({
  theme = {},
  className,
  children
}) => {
  const style = createStyle(theme)

  return (
    <div
      className={className}
      style={style}>
      {children}
    </div>
  )
}
