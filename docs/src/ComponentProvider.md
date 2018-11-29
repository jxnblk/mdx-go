
# ComponentProvider

Wrap your application with the ComponentProvider to use custom MDX components.

```jsx
// example Root component
import React from 'react'
import { ComponentProvider } from 'mdx-go'

export const Root = props =>
  <ComponentProvider>
    {props.children}
  </ComponentProvider>
```


