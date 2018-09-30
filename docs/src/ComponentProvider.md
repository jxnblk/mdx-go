
# ComponentProvider

Wrap your application with the ComponentProvider to use custom MDX components.

```jsx
// example Root component
import React from 'react'
import { ComponentProvider } from 'blazin'

export const Root = props =>
  <ComponentProvider>
    {props.children}
  </ComponentProvider>
```

For a version with built-in styles, see the [`StyleProvider`](/StyleProvider) component.

