import React from 'react'

const css = `
.root {
  line-height: calc(4/3);
  max-width: 1024px;
  margin: auto;
  padding: 48px;
}
.root h1 {
  font-size: 3rem;
}
.root pre, .root code {
  font-family: Menlo, monospace;
}
.root p {
  font-size: 1.25em;
}
.root a {
  color: #07c;
}
`

const style = (
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />
)

export const Root = props =>
  <div className='root'>
    {style}
    {props.children}
  </div>
