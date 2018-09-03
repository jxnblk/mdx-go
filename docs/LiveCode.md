
export const name = 'LiveCode'

# LiveCode

The LiveCode component is primarily used to convert fenced code blocks to live code previews when using the `.jsx` language attribute.
It's a wrapper around [react-live][] and can be used outside of MDX.

To enable LiveCode in fenced code blocks, use either the [ComponentProvider](/ComponentProvider) or [StyleProvider](/StyleProvider) in a [Root](/configuration#root-component) component.


```jsx
// example Root component
import React from 'react'
import { ComponentProvider } from 'mdx-go'

export const Root = props =>
  <ComponentProvider>
    {props.children}
  </ComponentProvider>
```

Once the LiveCode component is provided to MDX, use the `.jsx` language attribute to enable an editable preview of the code block.

````mdx
```.jsx
<h2>LiveCode example</h2>
```
````

The fenced code block above will render as seen below:

```.jsx
<h2>LiveCode example</h2>
```

## Component Scope

To add components to scope for use within the LiveCode component's code blocks, pass a `components` prop to the `ComponentProvider`.

```jsx
// example Root component
import React from 'react'
import { ComponentProvider } from 'mdx-go'
import Button from '../src/Button'

const components = {
  Button
}

export const Root = props =>
  <ComponentProvider components={components}>
    {props.children}
  </ComponentProvider>
```

With the setup above, the `Button` component will now be in scope for code blocks.

````mdx
```.jsx
<Button>Button</Button>
```
````

## Theming

Use a ThemeProvider or the [StyleProvider](/StyleProvider) to pass a theme to the LiveCode component.

```jsx
// example Root component
import React from 'react'
import { StyleProvider } from 'mdx-go'

const theme = {
  LiveCode: {
    borderColor: 'tomato',
    borderRadius: '4px'
  },
  LiveEditor: {
    color: 'magenta',
    backgroundColor: 'black'
  }
}

export const Root = props =>
  <StyleProvider theme={theme}>
    {props.children}
  </StyleProvider>
```


Theme Key     | Description
--------------|-----------------------
`LiveCode`    | CSS for the root element
`LivePreview` | CSS for the [react-live][] preview component
`LiveEditor`  | CSS for the [react-live][] editor component
`LiveError`   | CSS for the [react-live][] error component

[react-live]: https://github.com/FormidableLabs/react-live
