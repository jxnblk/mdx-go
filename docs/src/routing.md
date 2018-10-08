
# Routing

Each MDX file in the target directory will become its own route,
with `index.mdx` serving as the base route, i.e. `/`.

With the following directory structure:

```
docs/
  index.mdx
  getting-started.mdx
  api.mdx
```

MDX Go will create routes for `/`, `/getting-started`, and `/api`.

## React Components

MDX Go also supports using React components as routes for files with the `.js` extension.
Be sure that the `.js` file exports a default component to render as a route.

```jsx
// example React component route
import React from 'react'

export default props =>
  <h1>Hello</h1>
```

## Customizing Routes

Each page can customize its path and other metadata using exports.

To set a custom path, without renaming the file, export a `path` string.

```mdx
export const path = '/go'

# Getting Started
```

## Route Object

Each file will generate a route object with the following keys. Additionally, the `index.mdx` route will include any additional named exports from the file.

Key | Description
---|---
`key` | Key from wepback's `require.context`
`extname` | The file extension of the route
`name` | The file basename
`dirname` | The directory of the file
`path` | Route pathname used for routing
`Component` | React component
