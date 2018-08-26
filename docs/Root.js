import React from 'react'
import { Head } from '..'

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
    <Head>
      <title>mdx-go</title>
      <meta name='description' content='Lightning-fast MDX-based dev server' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@jxnblk' />
      <meta name='twitter:title' content='mdx-go' />
      <meta name='twitter:description' content='Lightning-fast MDX-based dev server' />
      <meta name='twitter:image' content='https://jxnblk.com/mdx-go/card.png' />
    </Head>
    {style}
    {props.children}
  </div>
