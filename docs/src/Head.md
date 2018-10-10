
# Head

Use the Head component to set contents in the document `<head>`.
This component can be used in a Root component or in individual pages.

```mdx
import { Head } from 'tinkerbox'

<Head>
  <title>My Page Title</title>
</Head>
```

## Webfonts

The Head component can be used to load webfonts with a `<link>` tag.

```mdx
<Head>
  <link
    rel='stylesheet'
    href='https://fonts.googleapis.com/css?family=Roboto'
  />
</Head>
```
