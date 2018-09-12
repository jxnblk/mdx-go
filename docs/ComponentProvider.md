
export const name = 'ComponentProvider'

# ComponentProvider

Wrap your application with the ComponentProvider to use custom MDX components and [LiveCode](/LiveCode) enabled fenced code blocks in MDX.

```jsx
// example Root component
import React from 'react'
import { ComponentProvider } from 'mdx-go/emotion'

export const Root = props =>
  <ComponentProvider>
    {props.children}
  </ComponentProvider>
```

For a version with built-in styles, see the [`StyleProvider`](/StyleProvider) component.

