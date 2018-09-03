
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
