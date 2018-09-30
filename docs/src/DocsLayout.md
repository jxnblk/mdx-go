
# DocsLayout

The DocsLayout component is a zero-config layout component for enabling the following:

- [StyleProvider](/StyleProvider)
- [Layout](/Layout)
- [NavLinks](/NavLinks)
- [Pagination](/Pagination)
- [ScrollTop](/ScrollTop)

This component can be exported directly from the `index.mdx` file.

```mdx
export { DocsLayout as Root } from 'blazin'

# With Default Layout and Styles
```

Or in a custom Root component.

```jsx
// example Root component
import React from 'react'
import { DocsLayout } from 'blazin'

export const Root = props =>
  <DocsLayout {...props} />
```
