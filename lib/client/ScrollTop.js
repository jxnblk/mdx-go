import React from 'react'
import { withRouter } from 'react-router-dom'

export const ScrollTop = withRouter(class extends React.Component {
  componentDidUpdate (prev) {
    if (prev.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0)
    }
    const { hash } = this.props.location
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (!el) return
      el.scrollIntoView()
    }
  }

  render () {
    return false
  }
})

export default ScrollTop
