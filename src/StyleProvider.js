import React from 'react'
import ComponentProvider from './ComponentProvider'

const cx = (tag) => props => React.createElement(tag, { ...props, className: 'mdx-' + tag })

const tags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'blockquote',
  'ul',
  'ol',
  'li',
  'img',
  'hr',
  'table',
  // todo // 'a', 'pre', 'code',
]

const defaultComponents = tags.reduce((obj, tag) => ({
  ...obj,
  [tag]: cx(tag)
}), {})

const css = ({
}) => `
.mdx-StyleProvider {
  --h0: 4.5rem;
  --h1: 3rem;
  --h2: 2.25rem;
  --h3: 1.5rem;
  --h4: 1.125rem;
  --h5: .75rem;
  --lh: calc(4/3);
  --m1: calc(2/3 * 1em);
  --m2: calc(4/3 * 1em);
  --m3: calc(8/3 * 1em);
  --m4: calc(16/3 * 1em);
}

.mdx-StyleProvider {
  line-height: var(--lh);
}

.mdx-h1,
.mdx-h2,
.mdx-h3 {
  margin-top: var(--m1);
  margin-bottom: 0;
}

.mdx-h4,
.mdx-h5,
.mdx-h6,
.mdx-p,
.mdx-dl,
.mdx-ol,
.mdx-ul,
.mdx-table,
.mdx-blockquote {
  margin-top: var(--m2);
  margin-bottom: var(--m2);
}

.mdx-h1 { font-size: var(--h2) }
.mdx-h2,
.mdx-h3 { font-size: var(--h3) }
.mdx-h4 { font-size: var(--h4) }
.mdx-h5,
.mdx-h6 { font-size: var(--h5) }

.mdx-img {
  max-width: 100%;
  height: auto;
}

.mdx-blockquote {
  font-size: var(--h3);
  margin-left: 0;
  margin-right: 0;
}

.mdx-hr {
  border: 0;
  height: 1px;
  background-color: var(--mdx-border, #ddd);
}

.mdx-StyleProvider pre {
  font-family: Menlo, monospace;
  font-size: 14px;
}
.mdx-StyleProvider code {
  font-family: Menlo, monospace;
  font-size: 0.875em;
}

.mdx-table {
  width: 100%;
  margin-top: var(--m3);
  margin-bottom: var(--m3);
  border-collapse: separate;
  border-spacing: 0;
  border-color: var(--mdx-border, #ddd);
}
.mdx-table th {
  text-align: left;
  vertical-align: bottom;
}
.mdx-table td {
  vertical-align: top;
}
.mdx-table td,
.mdx-table th {
  padding-top: var(--m1);
  padding-bottom: var(--m1);
  padding-left: 0;
  padding-right: var(--m1);
  border-color: inherit;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

@media screen and (min-width:40em) {
  .mdx-h1 { font-size: var(--h1) }
  .mdx-h2 { font-size: var(--h2) }
}
`.replace(/\n/g, '')

const CSS = props =>
  <style
    id='StyleProvider-CSS'
    dangerouslySetInnerHTML={{
      __html: css(props)
    }}
  />

const Root = ({
  fontFamily,
  fontSize,
  lineHeight,
  color,
  bg,
  style,
  children
}) =>
  <div
    className='mdx-StyleProvider'
    style={{
      fontFamily,
      fontSize,
      lineHeight,
      color,
      backgroundColor: bg,
      ...style
    }}
    children={children}
  />

export const StyleProvider = ({
  components = {},
  ...props
}) =>
  <ComponentProvider components={{
    ...defaultComponents,
    ...components
  }}>
    <CSS {...props} />
    <Root {...props} />
  </ComponentProvider>

export default StyleProvider
