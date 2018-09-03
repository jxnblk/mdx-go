
export const name = 'Components'

# Components

mdx-go includes several built-in components for live code previews, layout, and more.

## LiveCode

```.jsx
<h2>LiveCode example</h2>
```

## Layout

```jsx
import React from 'react'
import { Layout } from 'mdx-go'

export const Root = props =>
  <Layout>
    <Layout.Sidebar>
      Sidebar content
    </Layout.Sidebar>
    <Layout.Main>
      {props.children}
    </Layout.Main>
  </Layout>
```

- Layout.Sidebar
- Layout.Main
- Layout.MenuToggle
- Layout.NavBar
- withLayout

- [ ] Head
- [ ] Link
- [ ] ComponentProvider
- [ ] withComponents
- [ ] NavLinks
- [ ] LiveCode

- [ ] Pagination
- [ ] StyleProvider

- [ ] DocsLayout
