import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import {
  width,
  space,
  color,
  display,
  maxWidth,
  height,
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
  width: 256,
  display: [ 'none', 'block' ],
}

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
}, display)

Overlay.propTypes = {
  ...display.propTypes,
}

Overlay.defaultProps = {
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
      onClick={closeMenu}
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
  maxWidth: '768px',
  mx: 'auto',
  px: 4,
  py: 4,
}

export const Main = props =>
  <MainRoot>
    <MainContainer {...props} />
  </MainRoot>

export const MenuIcon = styled(({
  size = 24,
  ...props
}) =>
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    {...props}>
    <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
  </svg>
)({
  display: 'block'
})

export const MenuButton = styled('button')({
  appearance: 'none',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  display: 'inline-block',
  border: 0,
  borderRadius: 0,
}, space, color, css)

MenuButton.defaultProps = {
  color: 'inherit',
  bg: 'transparent',
  p: 0,
  m: 0,
}

export const MenuToggle = withLayout(({
  toggleMenu,
  closeMenu,
  openMenu,
  update,
  open,
  children,
  ...props
}) => typeof children === 'function'
  ? children({ open, toggleMenu })
  : (
    <MenuButton
      {...props}
      onClick={toggleMenu}>
      {children}
    </MenuButton>
  ))

MenuToggle.defaultProps = {
  title: 'Toggle Menu',
  children: <MenuIcon />
}

MenuToggle.isMenuToggle = true

const NavBarRoot = styled('header')({
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
}, space, height, color, css)

const NavBarSpacer = styled('div')({}, height)

export const NavBar = ({
  height,
  ...props
}) =>
  <React.Fragment>
    <NavBarSpacer height={height} />
    <NavBarRoot
      {...props}
      height={height}
    />
  </React.Fragment>

NavBar.propTypes = {
  ...space.propTypes,
  ...height.propTypes,
  ...color.propTypes,
}

NavBar.defaultProps = {
  height: 48,
  bg: 'white',
}

NavBar.isNavBar = true

export const toggle = state => ({ open: !state.open })
export const close = state => ({ open: false })
export const open = state => ({ open: true })

export class Layout extends React.Component {
  static Sidebar = Sidebar
  static Main = Main
  static MenuToggle = MenuToggle
  static NavBar = NavBar

  state = {
    open: false,
    update: fn => this.setState(fn),
  }

  render () {
    const {
      ...props
    } = this.props

    const context = {
      ...this.state,
      toggleMenu: () => this.state.update(toggle),
      openMenu: () => this.state.update(open),
      closeMenu: () => this.state.update(close),
    }

    const children = React.Children.toArray(this.props.children)
    const columns = children.filter(child => !child.type.isNavBar && !child.type.isMenuToggle)
    const [ navbar ] = children.filter(child => child.type.isNavBar)
    const [ menuToggle ] = children.filter(child => child.type.isMenuToggle)

    return (
      <Provider value={context}>
        {menuToggle}
        {navbar}
        <Root {...props}>
          {columns}
        </Root>
      </Provider>
    )
  }
}

export default Layout
