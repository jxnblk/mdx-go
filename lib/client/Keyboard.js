import React from 'react'
import { Location } from '@reach/router'
import routes from './routes'

export class Keyboard extends React.Component {
  handleKeyDown = e => {
    const { location } = this.props
    const { tagName } = document.activeElement
    if (tagName !== 'BODY' && tagName !== 'DIV') return
    switch (e.key) {
      case '/':
        this.navigate('/_')
        break
      case 'ArrowLeft':
      case 'k':
        this.goto(-1)
        break
      case 'ArrowRight':
      case 'j':
        this.goto(1)
        break
    }
  }

  navigate = pathname => {
    const { navigate } = this.props
    navigate(pathname)
      .then(() => {
        window.scrollTo(0, 0)
      })
  }

  goto = n => {
    const { location } = this.props
    const index = routes.findIndex(route => route.path === location.pathname)
    const next = routes[index + n]
    if (!next) return
    this.navigate(next.path)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  render () {
    return false
  }
}

export default props =>
  <Location
    children={router => <Keyboard {...router} />}
  />
