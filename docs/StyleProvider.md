
export const name = 'StyleProvider'

# StyleProvider

The StyleProvider component is an extension of the [ComponentProvider](/ComponentProvider) component that includes default styles for MDX components
with support for theming.

```jsx
// example Root component
import React from 'react'
import { StyleProvider } from 'mdx-go'

export const Root = props =>
  <StyleProvider>
    {props.children}
  </StyleProvider>
```

## Theming

Custom themes can be passed to the StyleProvider with the `theme` prop.

```jsx
<StyleProvider
  theme={theme}
/>
```

## Props

Prop | Type | Description
---|---|---
`theme` | object | [theme](#theming)
`components` | object | MDX component scope
`fontSize` | number, string, or array | Base font size
`fontFamily` | string | Base font family
`color` | string | Base text color
`bg` | string | Base background color
`css` | object or string | Additional CSS to pass to the root element


