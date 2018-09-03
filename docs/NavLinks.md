
export const name = 'NavLinks'

# NavLinks

The NavLinks component can be used to render a list of routes in the sidebar.

```jsx
// example Root component
import React from 'react'
import {
  Layout,
  NavLinks
} from 'mdx-go'

export const Root = props =>
  <Layout>
    <Layout.Sidebar>
      <NavLinks {...props} />
    </Layout.Sidebar>
    <Layout.Main>
      {props.children}
    </Layout.Main>
  </Layout>
```

## Props

Prop | Type | Description
---|---|---
`routes` | array (required) | Array of mdx-go route objects passed to the Root component
`order` | array | Array of route names to sort the links
`filter` | function | Optional function to filter routes
`fontSize` | number, string, or array | Changes the links' font size
`color` | string | Changes the links' color
`bg` | string | Changes the links' background color
`css` | object or string | Additional CSS to pass to the links
space | number, string, or array | All [styled-system][] [space props][] are passed to the links

[styled-system]: https://github.com/jxnblk/styled-system
[space props]: https://jxnblk.com/styled-system/api#space

