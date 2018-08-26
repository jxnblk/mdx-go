import React from 'react'

const hyphenate = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()

export const createStyle = theme => {
  const style = {}
  for (const key in theme) {
    style['--' + hyphenate(key)] = theme[key]
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
