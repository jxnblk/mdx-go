import React from 'react'
import { themes } from 'mdx-go'

console.log(themes)

export const Root = props =>
  <div
    {...props}
    style={{
      color: 'tomato'
    }}
  />
