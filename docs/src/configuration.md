
# Configuration

Virtually all Superdev configuration is handled with React components.
Superdev follows the philosophy of **components over configuration** instead of using custom plugins architectures and configuration objects in an effort to keep a minimal API surface area.

You can even write your own components to customize the theme and layout of Superdev.

## Root component

Using a custom Root component is the primary means of customizing an app in Superdev. It wraps the entire app with a React component that can provide themes and components via context, add page layouts, and intercept routing.

To wrap your entire application with a React component,
export a custom `Root` component from your main `index.mdx` file.
Note that a Root component must be exported from the `index.mdx` file and **not** another route.

```mdx
export const Root = props =>
  <div>
    {props.children}
  </div>
```

Using a custom Root component will override the default centered layout of Superdev, and can be used to provide custom themes and layouts to every route.

### Props

The Root component will recieve the current page as the `children` prop and receive an array of `routes` for each page.
Each route object will include the following:

Key | Description
---|---
`key` | Key from wepback's `require.context`
`extname` | The file extension of the route
`name` | The file basename
`exact` | Boolean for `index` routes
`dirname` | The directory of the file
`path` | Route pathname used for routing
`Component` | React component

Each route object will also include any exports from the file.
This allows you to override the `name` or add additional metadata to a page.

## MDX Layouts

Use a default export to wrap an individual route with a component.

```mdx
export default props =>
  <div style={{ padding: 32 }}>
    {props.children}
  </div>

# Page Layout
```

This is a built-in feature of MDX.
Learn more in the [MDX docs](https://mdxjs.com/syntax#export-default).

## Head

To customize the document `<head>` contents, use the `Head` component.

```mdx
import { Head } from 'superdev'

<Head>
  <title>My Page Title</title>
</Head>
```

The Head component can be used in individual pages or in a [Root component](#root-component) to add head content across the entire app.

Read more about the [Head component](/Head)

## MDX Components

MDX includes a mechanism to change the components rendered for each HTML element.
Use the `ComponentProvider` in a Root component to add custom components for MDX.

```js
// example Root component
import React from 'react'
import styled from 'react-emotion'
import { ComponentProvider } from 'superdev'

const components = {
  h1: styled('h1')({
    color: 'tomato'
  })
}

export const Root = props =>
  <ComponentProvider components={components}>
    {props.children}
  </ComponentProvider>
```


## Theming

Superdev contains almost no default styling, making it ideal for use with components that include their own styling.
To add themes or custom styling, wrap your app with a [Root component](configuration/#root-component).

To use optional, built-in styles, see the [StyleProvider](/StyleProvider) component.

## webpack

The default webpack configuration includes support for Babel, React, and MDX.
To customize the webpack config, add a `webpack.config.js` file to your project root, or pass a path to a custom webpack config via the `--webpack` CLI flag.
The provided webpack config will be merged with the built-in config using [webpack-merge][].

[webpack-merge]: https://github.com/survivejs/webpack-merge

## Babel

Add a `babel.config.js` file to customize the Babel configuration.

## CLI Options

The following flags can be passed to the CLI.

```
  -p --port     Port for dev server
  --no-open     Disable opening in default browser
  -d --out-dir  Output directory for static export
  --basename    Base path for routing
  --static      Export HTML without JS bundle
  --webpack     Path to custom webpack config
```

All CLI options can also be specified in an `superdev` field in your `package.json`.

```json
"superdev": {
  "outDir": "site"
}
```
