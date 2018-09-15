import React from 'react'
import PropTypes from 'prop-types'
import sortby from 'lodash.sortby'
import Link from './Link'

const sort = (routes, order) => sortby(routes, route => {
  const index = order.indexOf(route.name)
  return index < 0 ? Infinity : index
})

export const NavLink = ({
  activeColor,
  ...props
}) =>
  <Link
    {...props}
    className='NavLink'
    style={{
      display: 'block',
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 4,
      paddingBottom: 4,
      fontSize: 14,
      width: '100%',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: 'inherit',
      '--active-color': activeColor
    }}
  />

export const NavLinks = ({
  routes = [],
  order = [],
  filter,
  staticContext,
  history,
  location,
  match,
  ...props
}) =>
  <React.Fragment>
    <style
      dangerouslySetInnerHTML={{
        __html: '.NavLink.active{color:var(--active-color) !important}'
      }}
    />
    {sort(routes, order)
      .filter(filter)
      .map(route => (
      <NavLink
        key={route.key}
        {...props}
        href={route.path}
        exact={route.exact}
        children={route.name}
      />
    ))}
  </React.Fragment>

NavLinks.propTypes = {
  routes: PropTypes.array.isRequired,
  order: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired,
}

NavLinks.defaultProps = {
  order: [ 'index' ],
  filter: () => true,
  activeColor: '#07c'
}

export default NavLinks
