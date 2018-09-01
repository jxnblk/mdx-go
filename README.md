
# mdx-go

![](https://s3.amazonaws.com/jxnblk/mdx-go-24.gif)

:zap: Lightning fast [MDX][]-based dev server for progressive documentation

[![MIT License][license]](LICENSE.md)
[![Build Status][badge]][travis]
[![Version][version-badge]][npm]
[![Downloads][downloads-badge]][npm]

```sh
npm i -g mdx-go
```

- :zero: Zero-config dev server
- :memo: Write in markdown
- :atom_symbol: Import and use React components
- :file_folder: File-system based routing
- :triangular_ruler: Customizable layouts
- :woman_singer: Support for [styled-components][] & [emotion][]
- :globe_with_meridians: Export as static HTML
- :unlock: Avoid lock-in and easily migrate to other MDX-based tools

[badge]: https://flat.badgen.net/travis/jxnblk/mdx-go
[travis]: https://travis-ci.org/jxnblk/mdx-go

[version-badge]: https://flat.badgen.net/npm/v/mdx-go
[downloads-badge]: https://flat.badgen.net/npm/dt/mdx-go
[npm]: https://npmjs.com/package/mdx-go

[license]: https://flat.badgen.net/badge/license/MIT/blue
[coverage]: https://flat.badgen.net/codecov/c/github/jxnblk/mdx-go

## Getting Started

Create a `docs` folder and `docs/index.mdx` file.

```mdx
import MyComponent from '../src'

# Component Demo

<MyComponent
  beep='boop'
/>
```

Start the dev server on the `docs` folder:

```sh
mdx-go docs
```

### npm run scripts

Alternatively, mdx-go can be installed as a development dependency and used with run scripts in your `package.json`.

```json
"scripts": {
  "dev": "mdx-go docs",
  "docs": "mdx-go build docs"
}
```

```sh
npm run dev
```

## Motivation

mdx-go is built with the idea of **Progressive Documentation** in mind,
intended to be used anywhere as a dev server, prototyping tool, or simple static site generator.
By embracing the MDX file format, the docs you create with mdx-go can easily be used in other tools.
Start your docs with mdx-go, and migrated to tools like [Next.js][] and [Gatsby][] when needed.
You can even keep mdx-go around to use as a dev tool outside of other React applications.

[Next.js]: https://github.com/zeit/next.js/
[Gatsby]: https://github.com/gatsbyjs/gatsby

## Using MDX

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

## Routing

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

## Layouts

mdx-go includes a default layout that centers the document in the viewport,
but custom layout components can be added both globally and per-route.

To render a custom layout for a single route, export a component as the `default` from the MDX file.
This is a built-in [feature of MDX](https://mdxjs.com/syntax#export-default).

```mdx
import Layout from './Layout'

export default Layout

# Page with layout
```

To wrap all routes with a custom layout, export a `Root` component from your `index.mdx` file.
This will completely disable the built-in centered layout.
Note: this only works in the `index` route, not other routes.

```mdx
export { Root } from './Root'

# Root layout for all routes
```

## Head Content

Head contents can be set per-route by using the `Head` component.

```mdx
import { Head } from 'mdx-go'

<Head>
  <title>Page title</title>
</Head>

# Page with title
```

To set head contents for all routes, use the Head component within a [`Root` component](#layouts).

## Custom MDX Components

To customize the HTML components rendered from MDX, use the [MDXProvider](https://mdxjs.com/getting-started/#components) in a [`Root` component](#layouts).

```js
// example Root component
import React from 'react'
import { MDXProvider } from '@mdx-js/tag'

const components = {
  h1: props => <h1 {...props} style={{ fontSize: 48 }} />,
}

export const Root = props =>
  <MDXProvider components={components}>
    {props.children}
  </MDXProvider>
```

Ensure the Root component is exported from `index.mdx`

```mdx
export { Root } from './Root.js'
```

## Theming

Wrap MDX with a [Root components](#layouts) and use the [MDXProvider](#custom-mdx-components) to change the default styles.
For an out-of-the box solution, see [mdx-themes][].

## Exporting

To export as a static site with HTML and JS bundles, run:

```sh
mdx-go build docs
```

This will export all routes as HTML in a `dist` folder.
See [CLI Options](#cli-options) for configuration options.

## CSS-in-JS

mdx-go does not use any CSS-in-JS libraries internally, and most libraries will work when using the dev server.
To extract static CSS when using the `build` command, ensure you have either `styled-components` or `emotion` installed locally in your `package.json`.
For Emotion, be sure that `emotion-server` is also installed.

When either of these libraries are detected in your `package.json` dependencies, mdx-go will extract static CSS during the build process.

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

All CLI options can also be specified in a `mdx-go` field in your `package.json`.

```json
"mdx-go": {
  "outDir": "site"
}
```

## Custom webpack config

mdx-go will automatically pick up a `webpack.config.js` if it exists in the current working directory.
A custom path can be passed to the CLI using the `--webpack` flag.
The provided webpack config will be merged with the built-in config using [webpack-merge][].

[webpack-merge]: https://github.com/survivejs/webpack-merge


## Examples

- [Basic](examples/basic)
- [Head Content](examples/head-content)
- [Routing](examples/routing)
- [React Live](examples/react-live)
- [Styled Components](examples/styled-components)
- [Emotion](examples/emotion)

## Roadmap

- [ ] generator
- [ ] publish

## Related

[MDX][] | [mdx-deck][] | [mdx-docs][] | [ok-mdx][] |
[x0][]


[MIT License](LICENSE.md)

---

<p align='center'>
  <img src='docs/logo.png' width='64' height='64' />
</p>


[MDX]: https://github.com/mdx-js/mdx
[mdx-themes]: https://github.com/jxnblk/mdx-themes
[mdx-deck]: https://github.com/jxnblk/mdx-deck
[mdx-docs]: https://github.com/jxnblk/mdx-docs
[ok-mdx]: https://github.com/jxnblk/ok-mdx
[styled-components]: https://github.com/styled-components/styled-components
[emotion]: https://github.com/emotion-js/emotion
[x0]: https://github.com/c8r/x0
[Progressive Documentation]: https://jxnblk.com/writing/posts/progressive-documentation/
