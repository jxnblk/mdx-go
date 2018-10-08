import React from 'react'

export const lazyComponent = (loader, loading) => {
  let Component = null

  return class Loadable extends React.Component {
    static preload = () => {
      Component = loader().default
    }

    constructor () {
      super()
      this.state = {
        Component,
      }
    }

    componentDidMount () {
      const load = loader()
      if (typeof load.then !== 'function') {
        this.setState({ Component: load.default })
        return
      }

      load.then(({
        default: Component,
      }) => {
        this.setState({ Component })
      })
    }

    render () {
      const { Component } = this.state

      if (!Component) return false

      return (
        <Component
          {...this.props}
        />
      )
    }
  }
}

export default lazyComponent
