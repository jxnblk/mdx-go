// vanilla css components
import React from 'react'
import Link from './Link'

const join = (...args) => args.filter(Boolean).join(' ')
const classname = (Tag, className) => props =>
  <Tag {...props} className={join(props.className, className)} />

const heading = Tag => ({ id, children, ...props }) =>
  <Tag {...props} id={id}>
    <a
      href={'#' + id}
      style={{
        textDecoration: 'none',
        color: 'inherit'
      }}>
      {children}
    </a>
  </Tag>

const h1 = classname(heading('h1'), 'mdx-h1')
const h2 = classname(heading('h2'), 'mdx-h2')
const h3 = classname(heading('h3'), 'mdx-h3')
const h4 = classname(heading('h4'), 'mdx-h4')
const h5 = classname(heading('h5'), 'mdx-h5')
const h6 = classname(heading('h6'), 'mdx-h6')
const a = classname(Link, 'mdx-a')
const p = classname('p', 'mdx-p')
const ul = classname('ul', 'mdx-ul')
const ol = classname('ol', 'mdx-ol')
const li = classname('li', 'mdx-li')
const blockquote = classname('blockquote', 'mdx-blockquote')
const img = classname('img', 'mdx-img')
const pre = classname('pre', 'mdx-pre')
const code = classname('code', 'mdx-code')

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  ol,
  ul,
  li,
  blockquote,
  img,
  // adjust for remark
  pre: props => props.children,
  code: pre,
  inlineCode: code,
}
