// experimental styled-components wrapper
import React from 'react'
import {
  StyleSheetManager,
  __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS,
  // StyleSheet,
  ServerStyleSheet
} from 'styled-components'

const { StyleSheet } = __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS

const isBrowser = typeof document !== 'undefined'

const sheet = isBrowser ? new StyleSheet() : new ServerStyleSheet()

export default class extends React.Component {
  style = React.createRef()

  state = {
    didMount: false
  }

  componentDidMount () {
    this.setState({ didMount: true })
    console.log(this.style)
  }

  render () {
    const { children } = this.props

    if (!this.state.didMount || !this.style.current) {
      console.log(sheet.toReactElements())
      return (
        <React.Fragment>
          <div key='style' ref={this.style} />
          <StyleSheetManager sheet={sheet}>
            {children}
          </StyleSheetManager>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div key='style' ref={this.style} />
        <StyleSheetManager target={this.style.current}>
          {children}
        </StyleSheetManager>
      </React.Fragment>
    )
  }
}
