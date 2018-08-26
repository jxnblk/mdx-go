// vanilla css theme
import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import baseComponents from '../components'
import CSSVars from './CSSVars'

const baseTheme = {
  h1: '3rem',
  h2: '2.25rem',
  h3: '1.5rem',
  h4: '1.125rem',
  h5: '1rem',
  h6: '.75rem',
  lineHeight: 4/3,
  maxWidth: '1024px',
  m1: 2/3 + 'em',
  m2: 4/3 + 'em',
  m3: 8/3 + 'em',
  m4: 16/3 + 'em',
  color: 'black',
  background: 'white',
  link: '#07c',
  pre: '#000',
  preBackground: '#f6f8fa',
  radius: '2px',
}

const css = `
.mdx-base-theme {
  line-height: var(--line-height);
  max-width: var(--max-width);
  margin: auto;
  padding: var(--m2);
  color: var(--color);
  background-color: var(--background);
}

.mdx-a {
  color: var(--link);
}

.mdx-img {
  max-width: 100%;
  height: auto;
}

.mdx-h1 { font-size: var(--h1) }
.mdx-h2 { font-size: var(--h2) }
.mdx-h3 { font-size: var(--h3) }
.mdx-h4 { font-size: var(--h4) }
.mdx-h5 { font-size: var(--h5) }
.mdx-h6 { font-size: var(--h6) }

.mdx-h1, .mdx-h2, .mdx-h3 {
  margin-top: var(--m1);
  margin-bottom: 0;
}

.mdx-h4, .mdx-h5, .mdx-h6,
.mdx-p, .mdx-ol, .mdx-ul,
.mdx-img, .mdx-blockquote {
  margin-top: var(--m2);
  margin-bottom: var(--m2);
}

.mdx-pre, .mdx-code {
  font-family: Menlo, monospace;
  font-size: var(--h5);
}

.mdx-pre {
  padding: var(--m1);
  color: var(--pre);
  background-color: var(--pre-background);
  border-radius: var(--radius);
}

.mdx-blockquote {
  font-size: var(--h3);
  font-weight: bold;
}
`

const style = (
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />
)

export const BaseTheme = ({
  theme = {},
  components = {},
  children
}) =>
  <CSSVars
    className='mdx-base-theme'
    theme={{
      ...baseTheme,
      ...theme
    }}>
    <MDXProvider
      components={{
        ...baseComponents,
        ...components
      }}>
      <React.Fragment>
        {style}
        {children}
      </React.Fragment>
    </MDXProvider>
  </CSSVars>

