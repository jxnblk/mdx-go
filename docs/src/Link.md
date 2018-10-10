
# Link

The Link component is provided as an MDX component by default.
It automatically handles absolute URLs and relative links with client-side routing.

When providing custom MDX components with the [ComponentProvider](/ComponentProvider), it's recommended you use the `Link` component for the `a` element.

```jsx
// example Root component
import React from 'react'
import { ComponentProvider, Link } from 'tinkerbox'
import styled from 'react-emotion'

const components = {
  a: styled(Link)({
    color: 'tomato'
  })
}

export const Root = props =>
  <ComponentProvider components={components}>
    {props.children}
  </ComponentProvider>
```

