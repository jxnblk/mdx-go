import React from 'react'
import PropTypes from 'prop-types'

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

export const Root = props =>
  <div
    {...props}
    style={{
      display: 'flex',
      width: '100%'
    }}
  />

const SidebarRoot = ({
  width,
  open,
  style,
  ...props
}) =>
  <div
    {...props}
    style={{
      width,
      transform: open ? 'none' : 'translateX(-100%)',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      overflowY: 'auto',
      backgroundColor: 'white',
      WebkitOverflowScrolling: 'touch',
      transitionProperty: 'transform',
      transitionDuration: '.2s',
      transitionTimingFunction: 'ease-out',
      ...style,
    }}
  />

SidebarRoot.defaultProps = {
  width: 256
}

const SidebarSpacer = props =>
  <div
    {...props}
    style={{
      flex: 'none',
      width: props.width,
    }}
  />

SidebarSpacer.defaultProps = {
  width: 256,
}

const Overlay = props =>
  <div
    {...props}
    style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    }}
  />

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
      open={open}
    />
  </React.Fragment>
)

Sidebar.defaultProps = {
  width: 256,
}

const MainRoot = props =>
  <div
    {...props}
    style={{
      width: '100%',
      minWidth: 0,
      minHeight: '100vh'
    }}
  />

const MainContainer = props =>
  <div
    {...props}
    style={{
      maxWidth: 768,
      padding: 32,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  />

export const Main = props =>
  <MainRoot>
    <MainContainer {...props} />
  </MainRoot>

export const MenuIcon = ({
  size = 24,
  ...props
}) =>
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={size}
    height={size}
    style={{
      display: 'block'
    }}>
    <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
  </svg>

export const MenuButton = props =>
  <button
    {...props}
    style={{
      appearance: 'none',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      display: 'inline-block',
      border: 0,
      borderRadius: 0,
      padding: 0,
      margin: 0,
      color: 'inherit',
      backgroundColor: 'transparent',
    }}
  />

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

const NavBarRoot = ({
  height,
  ...props
}) =>
  <header
    {...props}
    style={{
      height,
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
    }}
  />

const NavBarSpacer = ({ height }) =>
  <div style={{ height }} />

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

NavBar.defaultProps = {
  height: 48,
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
