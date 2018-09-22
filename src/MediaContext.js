import React from 'react'
import PropTypes from 'prop-types'

const MediaContext = React.createContext()

export const withMedia = Component => React.forwardRef((props, ref) =>
  <MediaContext.Consumer
    children={media => (
      <Component
        {...props}
        ref={ref}
        media={media}
      />
    )}
  />
)

export const MediaConsumer = MediaContext.Consumer

export class MediaProvider extends React.Component {
  static propTypes = {
    mediaQueries: PropTypes.object.isRequired,
  }

  state = {
    matches: []
  }

  listeners = []

  handleChange = name => e => {
    const { matches } = this.state
    if (e.matches && matches.indexOf(name) > -1) return
    if (e.matches) {
      this.setState(state => ({
        matches: [
          ...state.matches,
          name
        ]
      }))
    } else {
      this.setState(state => ({
        matches: state.matches.filter(n => n !== name)
      }))
    }
  }

  registerListener = ({ name, value }) => {
    const handleChange = this.handleChange(name)
    const matcher = window.matchMedia(value)
    const listener = matcher.addListener(handleChange)
    if (matcher.matches) {
      this.setState(state => ({ matches: [ ...state.matches, name ] }))
    }
    this.listeners.push({ matcher, listener })
  }

  removeListeners = () => {
    this.listeners.forEach(({ matcher, listener }) => {
      matcher.removeListener(listener)
    })
  }

  componentDidMount () {
    const { mediaQueries } = this.props
    Object.keys(mediaQueries)
      .map(name => ({ name, value: mediaQueries[name] }))
      .forEach(this.registerListener)
  }

  componentWillUnmount () {
    this.removeListeners()
  }

  render () {
    const {
      mediaQueries,
      ...props
    } = this.props
    const { matches } = this.state
    const context = { matches }
    matches.forEach(name => {
      context[name] = true
    })

    return (
      <MediaContext.Provider
        {...props}
        value={context}
      />
    )
  }
}
