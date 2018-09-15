import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import sortby from 'lodash.sortby'
import { withLink } from 'mdx-go'

const sort = (routes, order) => sortby(routes, route => {
  const index = order.indexOf(route.name)
  return index < 0 ? Infinity : index
})

const Flex = props =>
  <div
    {...props}
    style={{
      display: 'flex',
      paddingTop: 32,
      paddingBottom: 32,
      ...props.style
    }}
  />

const Spacer = props =>
  <div style={{ margin: 'auto' }} />

const NavLink = withLink(({ Link, ...props }) =>
  <Link
    {...props}
    style={{
      display: 'block',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: 'inherit',
      ...props.style
    }}
  />
)

export const Pagination = withRouter(({
  routes = [],
  order = [],
  filter,
  history,
  location,
  match,
  staticContext,
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
