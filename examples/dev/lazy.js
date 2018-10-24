import React, { Suspense, lazy } from 'react'

const Hello = lazy(() => import('../Hello.js'))

export default () =>
  <Suspense fallback={<pre>Loading</pre>}>
    <Hello />
  </Suspense>
