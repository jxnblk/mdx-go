
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

Each page can customize its name, path, and other metadata using exports.

To set a custom name for the route, export a `name` string.

```mdx
export const name = 'Getting Started'

# Getting Started
```

To set a custom path, without renaming the file, export a `path` string.

```mdx
export const path = '/go'

# Getting Started
```
