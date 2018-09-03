
export const name = 'Routing'

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

mdx-go will create routes for `/`, `/getting-started`, and `/api`.

mdx-go also supports using React components as routes for files with the `.js` extension.
Be sure that the `.js` file exports a default component to render as a route.

