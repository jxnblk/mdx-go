
export const name = 'ScrollTop'

# ScrollTop

The ScrollTop component ensures pages scroll to the top during a route transition. It is included by default by the [DocsLayout](/DocsLayout) component, but can be included in a Root component on its own.

```jsx
// example Root component
import React from 'react'
import { ScrollTop } from 'mdx-go'

export const Root = props =>
  <div>
    {props.children}
    <ScrollTop />
  </div>
```
