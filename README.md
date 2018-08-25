
# mdx-go

## Getting Started

```sh
npm i -D mdx-go
```

```json
"scripts": {
  "dev": "mdx-go docs",
  "docs": "mdx-go build docs"
}
```

Create `docs/index.mdx`

```mdx
import MyComponent from '../src'

# Component Demo

<MyComponent
  beep='boop'
/>
```

```sh
npm run dev
```

---

## Modes/Options

- Single Page
- Sidebar
- Isolation Mode
- Themes
  - Basic
  - Dark
  - Roboto
- styled-components/emotion/unstyled

---

```js
// Sidebar prototype
import React from 'react'
import { Sidebar } from 'mdx-go'

// emotion support
// import { Sidebar } from 'mdx-go/emotion'

export default ({ children }) =>
  <Sidebar
    links={[
      { name: 'Home', href: '/' },
      { name: 'Getting Started', href: '/getting-started' },
      { name: 'GitHub', href: 'https://github.com/jxnblk/mdx-go' },
    ]}
    width={256}
    color='#333'
    bg='#eee'
    css={{
      borderRight: '1px solid #07c'
    }}>
    {children}
  </Sidebar>
```

