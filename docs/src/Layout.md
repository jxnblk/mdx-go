
export const name = 'Layout'

# Layout

The built-in Layout component provides a component-based API for creating a responsive page layout with sidebar navigation.
This page uses the Layout component.

```jsx
import React from 'react'
import { Layout } from 'mdx-go/emotion'

export const Root = props =>
  <Layout>
    <Layout.MenuToggle />
    <Layout.Sidebar>
      Sidebar content
    </Layout.Sidebar>
    <Layout.Main>
      {props.children}
    </Layout.Main>
  </Layout>
```

### Props

The root `Layout` component supports the following props.

Prop | Type | Description
---|---|---
`color` | string | Text color
`bg` | string | Background color


## Sidebar

Use the `Layout.Sidebar` component to create a left sidebar that displays as an off-canvas drawer at narrow viewport widths.

### Props

Prop | Type | Description
---|---|---
`width` | number, string, or array | [styled-system][]'s [width][] prop
`color` | string | Text color
`bg` | string | Background color
space | number, string, or array | All [styled-system][] [space props][] are supported
`css` | object or string | Additional CSS to pass to the component

## Main

Use the `Layout.Main` component for the main content area.

### Props

Prop | Type | Description
---|---|---
`maxWidth` | number, string, or array | [styled-system][]'s [maxWidth][layout] prop
space | number, string, or array | All [styled-system][] [space props][] are supported
`css` | object or string | Additional CSS to pass to the component


## MenuToggle

Use the `Layout.MenuToggle` button component to toggle the visibility of the sidebar at narrow viewport widths.
This can be positioned anywhere on the page and will be rendered before the Sidebar and Main components.

The MenuToggle component includes a hamburger menu icon as its default `children` prop.

```jsx
<Layout>
  <Layout.MenuToggle />
  <Layout.Sidebar />
  <Layout.Main />
</Layout>
```

### Props

Prop | Type | Description
---|---|---
`color` | string | Text color
`bg` | string | Background color
space | number, string, or array | All [styled-system][] [space props][] are supported
`css` | object or string | Additional CSS to pass to the component

## NavBar

An optional `Layout.NavBar` component can be used to add a fixed position header to the top of the page.

```jsx
<Layout>
  <Layout.Navbar
    color='white'
    bg='black'>
    <Layout.MenuToggle />
  </Layout.Navbar>
</Layout>
```

### Props

Prop | Type | Description
---|---|---
`height` | number | Height in pixels
`color` | string | Text color
`bg` | string | Background color
space | number, string, or array | All [styled-system][] [space props][] are supported
`css` | object or string | Additional CSS to pass to the component

[styled-system]: https://github.com/jxnblk/styled-system
[space props]: https://jxnblk.com/styled-system/api#space
[width]: https://jxnblk.com/styled-system/api#width
[layout]: https://jxnblk.com/styled-system/api#layout
