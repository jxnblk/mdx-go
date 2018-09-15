import React from 'react'
import Link from './Link'

export const LinkContext = React.createContext({ Link })

export const withLink = Component => props =>
  <LinkContext.Consumer
    children={context => (
      <Component
        {...props}
        {...context}
      />
    )}
  />
