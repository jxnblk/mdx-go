
# mdx-go

:zap: Lightning fast [MDX][]-based dev server

```sh
npm i -D mdx-go
```

- :zero: Zero-config dev server
- :memo: Write in markdown
- :atom_symbol: Import and use React components
- :file_folder: File-system based routing
- :triangular_ruler: Customizable layouts
- :woman_singer: Support for [styled-components][] & [emotion][]
- :globe_with_meridians: Export as static HTML


## Getting Started


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
- [ ] CLI polish
- [ ] Emoji plugin/etc
- [ ] Test as dependency
- [x] Test global install
- [ ] custom webpack config
- [x] detect emotion/styled-components in package.json
- [x] static CSS export
- [ ] components dist
- [ ] error overlay
- [ ] Themes
- [ ] README
- [ ] Docs

## Related

- [MDX][]
- [mdx-deck][]
- [mdx-docs][]
- [ok-mdx][]


[MDX]: https://github.com/mdx-js/mdx
[mdx-deck]: https://github.com/jxnblk/mdx-deck
[mdx-docs]: https://github.com/jxnblk/mdx-docs
[ok-mdx]: https://github.com/jxnblk/ok-mdx
[styled-components]: https://github.com/styled-components/styled-components
[emotion]: https://github.com/emotion-js/emotion
