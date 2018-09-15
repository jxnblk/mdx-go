import React from 'react'
import { ComponentProvider } from 'mdx-go'
import { withLiveCode } from './LiveCode'

const cx = (tag) => props => React.createElement(tag, { ...props, className: 'mdx-' + tag })

const heading = Tag => ({ id, ...props }) =>
  <Tag id={id}>
    <a
      {...props}
      href={'#' + id}
      style={{
        textDecoration: 'none',
        color: 'inherit'
      }}
    />
  </Tag>

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
]

const scope = tags.reduce((obj, tag) => ({
  ...obj,
  [tag]: cx(tag)
}), {})

scope.h1 = heading(scope.h1)
scope.h2 = heading(scope.h2)
scope.h3 = heading(scope.h3)
scope.h4 = heading(scope.h4)
scope.h5 = heading(scope.h5)
scope.h6 = heading(scope.h6)

scope.code = withLiveCode(cx('pre'))
scope.inlineCode = cx('code')

const css = ({
  css
}) => `
.mdx-StyleProvider {
  --h1: 48px;
  --h2: 32px;
  --h3: 24px;
  --h4: 16px;
  --h5: 14px;
  --h6: 12px;
  --line-height: 1.625;
  --m1: 4px;
  --m2: 8px;
  --m3: 16px;
  --m4: 32px;
}

.mdx-StyleProvider {
  line-height: var(--line-height);
}

.mdx-h1,
.mdx-h2,
.mdx-h3,
.mdx-h4,
.mdx-h5,
.mdx-h6 {
  line-height: 1.25;
  margin-top: var(--m4);
  margin-bottom: var(--mb3);
}

.mdx-p,
.mdx-dl,
.mdx-ol,
.mdx-ul,
.mdx-table {
  margin-top: var(--m3);
  margin-bottom: var(--m3);
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

.mdx-pre {
  font-family: Menlo, monospace;
  font-size: 14px;
  padding: var(--m3);
  margin-top: var(--m4);
  margin-bottom: var(--m4);
  color: var(--mdx-pre-color, inherit);
  background-color: var(--mdx-pre-background, #f6f6ff);
  border-radius: var(--mdx-pre-radius, 2px);
}

.mdx-code {
  font-family: Menlo, monospace;
  color: var(--mdx-code-color, inherit);
  background-color: var(--mdx-code-background, transparent);
}

.mdx-ol,
.mdx-ul {
  padding-left: var(--m3);
  margin-top: var(--m3);
  margin-bottom: var(--m4);
}

.mdx-blockquote {
  font-size: var(--h3);
  margin-left: 0;
  margin-right: 0;
  margin-top: var(--m4);
  margin-bottom: var(--m4);
}

.mdx-hr {
  border: 0;
  height: 2px;
  background-color: var(--mdx-border, #ddd);
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
${css}
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
    ...scope,
    ...components
  }}>
    <CSS {...props} />
    <Root {...props} />
  </ComponentProvider>

export default StyleProvider
