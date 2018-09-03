import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import sortby from 'lodash.sortby'
import get from 'lodash.get'
import {
  space,
  fontSize,
  color,
} from 'styled-system'
import Link from './Link'

const sort = (routes, order) => sortby(routes, route => {
  const index = order.indexOf(route.name)
  return index < 0 ? Infinity : index
})

const css = props => props.css

const NavLink = styled(Link)({
  display: 'block',
  width: '100%',
  fontWeight: 'bold',
  textDecoration: 'none',
}, space, fontSize, color, css)

NavLink.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
}

NavLink.defaultProps = {
  px: 3,
  py: 1,
  fontSize: 1,
  color: 'inherit',
}

export const NavLinks = ({
  routes = [],
  order = [],
  filter,
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
        children={get(route, 'module.name', route.name)}
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
