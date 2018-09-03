import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import {
  width,
  space,
  color,
  display,
  maxWidth,
  style,
} from 'styled-system'

const css = props => props.css

export const LayoutContext = React.createContext()

const { Provider, Consumer } = LayoutContext

export const withLayout = Component => React.forwardRef((props, ref) =>
  <Consumer
    children={layout => (
      <Component
        ref={ref}
        {...props}
        {...layout}
      />
    )}
  />
)

export const Root = styled('div')({
  display: 'flex'
}, space, width, color, css)

Root.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...color.propTypes,
}

Root.defaultProps = {
  theme: {},
  width: 1,
}

const transform = style({
  prop: 'transform',
  cssProperty: 'transform',
})

const SidebarRoot = styled('div')({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  transitionProperty: 'transform',
  transitionDuration: '.2s',
  transitionTimingFunction: 'ease-out',
}, space, width, color,
  transform,
  css)

SidebarRoot.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...color.propTypes,
  ...transform.propTypes,
}

SidebarRoot.defaultProps = {
  theme: {},
  width: 256,
  bg: 'white',
  transform: [ false, 'none !important' ]
}

const SidebarSpacer = styled('div')({
  flex: 'none',
}, width, display)

SidebarSpacer.propTypes = {
  ...width.propTypes,
  ...display.propTypes,
}

SidebarSpacer.defaultProps = {
  theme: {},
  width: 256,
  display: [ 'none', 'block' ],
}

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}, display)

Overlay.propTypes = {
  ...display.propTypes,
}

Overlay.defaultProps = {
  theme: {},
  display: [ false, 'none' ],
}

export const Sidebar = withLayout(({
  open,
  closeMenu,
  width,
  style,
  ...props
}) =>
  <React.Fragment>
    {open && <Overlay onClick={closeMenu} />}
    <SidebarSpacer width={width} />
    <SidebarRoot
      {...props}
      width={width}
      style={{
        ...style,
        transform: open ? undefined : 'translateX(-100%)'
      }}
    />
  </React.Fragment>
)

Sidebar.propTypes = {
  ...width.propTypes,
}

Sidebar.defaultProps = {
  width: 256,
}

const MainRoot = styled('div')({
  width: '100%',
  minWidth: 0,
  minHeight: '100vh'
})

const MainContainer = styled('div')({},
  space,
  maxWidth,
  css
)

MainContainer.propTypes = {
  ...space.propTypes,
  ...maxWidth.propTypes,
}

MainContainer.defaultProps = {
  theme: {},
  maxWidth: '768px',
  mx: 'auto',
  px: 4,
  py: 4,
}

export const Main = props =>
  <MainRoot>
    <MainContainer {...props} />
  </MainRoot>

export const MenuToggle = withLayout(({
  toggleMenu,
  open,
  children,
}) => typeof children === 'function'
  ? children({ open, toggleMenu })
  : (
    <div onClick={toggleMenu}>
      {children}
    </div>
  ))

export const toggle = state => ({ open: !state.open })
export const close = state => ({ open: false })
export const open = state => ({ open: true })

export class Layout extends React.Component {
  static Sidebar = Sidebar
  static Main = Main
  static MenuToggle = MenuToggle

  state = {
    open: false,
    update: fn => this.setState(fn),
  }

  render () {
    const {
      children,
      ...props
    } = this.props

    const context = {
      ...this.state,
      toggleMenu: () => this.state.update(toggle),
      openMenu: () => this.state.update(open),
      closeMenu: () => this.state.update(close),
    }

    return (
      <Provider value={context}>
        <Root {...props}>
          {children}
        </Root>
      </Provider>
    )
  }
}
