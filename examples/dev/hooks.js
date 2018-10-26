import React from 'react'
import objectStyle from 'object-style'

// useContext(Context)
// useCallback(cb, [a, b])
// useLayoutEffect(fn, [...inputs])

const StyleContext = React.createContext()

const colors = [
  'cyan',
  'magenta',
  'yellow'
]

export default () => {
  const styles = []
  const [ i, setIndex ] = React.useState(0)
  const pushStyle = React.useCallback((style) => {
    const { className, css } = objectStyle(style)
    console.log('push', style, className, css)
    styles.push(css)
    return className
  })
  console.log(styles)

  return (
    <StyleContext.Provider value={pushStyle}>
      <style
        dangerouslySetInnerHTML={{
          __html: styles.join('')
        }}
      />
      <div>
        <h1>Hooks examples</h1>
        <Box color={colors[i]} onClick={e => setIndex((i + 1) % colors.length)}>
          Box {i} {colors[i]}
        </Box>
      </div>
    </StyleContext.Provider>
  )
}

export const Box = ({
  color,
  ...props
}) => {
  const ctx = React.useContext(StyleContext)
  const cx = React.useCallback(ctx, [ color ])
  // const cb = React.useCallback(() => { }, [color])

  const className = cx({ color })

  return (
    <div
      {...props}
      className={className}
    />
  )
}
