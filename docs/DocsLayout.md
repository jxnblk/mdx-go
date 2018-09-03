
export const name = 'DocsLayout'

# DocsLayout

The DocsLayout component is a zero-config layout component for enabling the following:

- [StyleProvider](/StyleProvider)
- [Layout](/Layout)
- [NavLinks](/NavLinks)
- [Pagination](/Pagination)
- [ScrollTop](/ScrollTop)

This component can be exported directly from the `index.mdx` file.

```mdx
export { DocsLayout as Root } from 'mdx-go'

# With Default Layout and Styles
```

Or in a custom Root component.

```jsx
// example Root component
import React from 'react'
import { DocsLayout } from 'mdx-go'

export const Root = props =>
  <DocsLayout {...props} />
```
