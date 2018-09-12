import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'react-emotion'
import sortby from 'lodash.sortby'
import {
  space,
  fontSize,
  color
} from 'styled-system'
import { Link } from 'mdx-go'

const sort = (routes, order) => sortby(routes, route => {
  const index = order.indexOf(route.name)
  return index < 0 ? Infinity : index
})

const Flex = styled('div')({
  display: 'flex'
}, space)

const Spacer = styled('div')({ margin: 'auto' })

const NavLink = styled(Link)({
  display: 'block',
  fontWeight: 'bold',
  textDecoration: 'none',
}, space, fontSize, color, props => props.css)

NavLink.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
}

NavLink.defaultProps = {
  py: 1,
  fontSize: 3,
  color: 'inherit',
}

export const Pagination = withRouter(({
  routes = [],
  order = [],
  filter,
  history,
  location,
  match,
  ...props
}) => {
  const { pathname } = location
  const links = sort(routes, order).filter(filter)
  const index = links.findIndex(link => link.path === pathname)
  const previous = links[index - 1]
  const next = links[index + 1]

  return (
    <Flex py={4}>
      {previous && (
        <NavLink {...props} href={previous.path}>
          {previous.name}
        </NavLink>
      )}
      <Spacer />
      {next && (
        <NavLink {...props} href={next.path}>
          {next.name}
        </NavLink>
      )}
    </Flex>
  )
})

Pagination.propTypes = {
  routes: PropTypes.array.isRequired,
  order: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired,
}

Pagination.defaultProps = {
  order: [ 'index' ],
  filter: () => true,
}

export default Pagination
