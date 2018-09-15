import React from 'react'
import PropTypes from 'prop-types'
import sortby from 'lodash.sortby'
import Link from './Link'

const sort = (routes, order) => sortby(routes, route => {
  const index = order.indexOf(route.name)
  return index < 0 ? Infinity : index
})

export const NavLink = props =>
  <Link
    {...props}
    classname='NavLink'
    style={{
      display: 'block',
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 4,
      paddingBottom: 4,
      fontSize: 12,
      width: '100%',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: 'inherit',
    }}
  />

export const NavLinks = ({
  routes = [],
  order = [],
  filter,
  staticContext,
  ...props
}) =>
  <React.Fragment>
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
}

export default NavLinks
