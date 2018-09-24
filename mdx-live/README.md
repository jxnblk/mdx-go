
# mdx-live

Add live code examples to MDX with [react-live][]

```sh
npm i mdx-live
```

```jsx
import React from 'react'
import { MDXLiveProvider } from 'mdx-live'
import Doc from './doc.mdx'

export default props =>
  <MDXLiveProvider>
    <Doc />
  </MDXLiveProvider>
```

[react-live]: https://github.com/FormidableLabs/react-live
