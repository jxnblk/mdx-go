
export const name = 'Exporting'

# Exporting

To export as static HTML with a client-side JS bundle, use the `build` command.

```sh
mdx-go build docs
```

This will create a `dist/` directory with an HTML file for each route and include a `main.js` bundle.

## CSS-in-JS

To ensure [emotion][] or [styled-components][] styles are rendered during build, be sure one of these libraries is included as a dependency in your `package.json`.

For [emotion][], be sure to install `emotion-server` for static export.

```sh
npm i emotion-server
```

## HTML Only

To export a site as static HTML without JS, use the `--static` flag.

```sh
mdx-go build docs --static
```

## Options

Use the following CLI options to customize the export.

```
  -d --out-dir  Output directory for static export
  --basename    Base path for routing
  --static      Export HTML without JS bundle
```

[emotion]: https://github.com/emotion-js/emotion
[styled-components]: https://github.com/styled-components/styled-components
