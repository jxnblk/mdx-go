
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

- [ ] Head
- [ ] Link
- [ ] Pagination
- [ ] NavLinks
- [ ] ComponentProvider
- [ ] LiveCode
