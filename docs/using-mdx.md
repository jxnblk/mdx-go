
export const name = 'Using MDX'

# Using MDX

MDX combines the simplicity of markdown with the expressiveness of JSX.
MDX lets you import and use React components inline with markdown docs.

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

To learn more about using MDX, see the [MDX docs][MDX].

[MDX]: https://github.com/mdx-js/mdx
