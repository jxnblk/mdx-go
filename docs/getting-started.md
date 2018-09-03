
export const name = 'Getting Started'

# Getting Started

mdx-go is best suited as a globally available dev server for React
that can be used in any project.
Install mdx-go globally with the following command:

```sh
npm install -g mdx-go
```

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

mdx-go is built with the idea of **[Progressive Documentation][]** in mind,
intended to be used anywhere as a dev server, prototyping tool, or simple static site generator.
By embracing the MDX file format, the docs you create with mdx-go can easily be used in other tools.
Start your docs with mdx-go, and migrated to tools like [Next.js][] and [Gatsby][] when needed.
You can even keep mdx-go around to use as a dev tool outside of other React applications.

[Progressive Documentation]: https://jxnblk.com/writing/posts/progressive-documentation/
[Next.js]: https://github.com/zeit/next.js/
[Gatsby]: https://github.com/gatsbyjs/gatsby
