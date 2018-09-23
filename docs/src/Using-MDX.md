
# Using MDX

MDX combines the simplicity of markdown with the ability to import and use React components inline.

Write markdown like you normally would.

```md
# Hello
```

Import and use React components inline.

```mdx
import { Box } from 'grid-styled'

# Hello

<Box p={3} bg='tomato'>
  This is a React component!
</Box>
```

## Exports

MDX uses the ES export syntax to communicate with its parent.
mdx-go makes use of this to customize layouts, routing, and set other configuration options.

For example, a custom [Root component](/configuration#root-component) that wraps the entire app can be added by exporting `Root` from your `index.mdx` file.

```mdx
export const Root = props =>
  <div
    style={{
      color: 'tomato'
    }}>
    {props.children}
  </div>

# Tomato
```

To learn more about using MDX, see the [MDX docs][MDX].

[MDX]: https://github.com/mdx-js/mdx
