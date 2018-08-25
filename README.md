
# :zap: mdx-go

Lightning fast MDX-based dev server

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

- [x] HTML export
- [x] Multiple page export
- [x] Head component
- [x] Layouts
- [x] Head component
- [ ] Test as dependency
- [ ] Test global install
- [ ] custom webpack config
- [ ] detect emotion/styled-components in package.json
- [ ] static CSS export
- [ ] components dist
- [ ] Themes
- [ ] README
- [ ] Docs



[MDX]: https://github.com/mdx-js/mdx
[styled-components]: https://github.com/styled-components/styled-components
[emotion]: https://github.com/emotion-js/emotion
