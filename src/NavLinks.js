import React from 'react'
import PropTypes from 'prop-types'
import sortby from 'lodash.sortby'
import { withLink } from './LinkContext'

const sortOrder = order => route => {
  const index = order.indexOf(route.name)
  return index < 0 ? Infinity : index
}

const sort = (routes, order) => sortby(
  sortby(routes, r => r.dirname),
  sortOrder(order)
)

const groupRoutes = routes => routes.reduce((a, route) => {
    let section = a.find(s => s.dirname === route.dirname)
    if (!section) {
      const parts = route.dirname.split('/')
      const name = parts[parts.length - 1]
      section = {
        name,
        dirname: route.dirname,
        depth: parts.length - 1,
        routes: []
      }
      a.push(section)
    }
    section.routes.push(route)
    return a
  }, [])
  .sort((a, b) => a.dirname < b.dirname ? -1 : 1)

export const NavLink = withLink(({
  Link,
  activeColor,
  depth = 0,
  ...props
}) =>
  <Link
    {...props}
    className='NavLink'
    style={{
      display: 'block',
      paddingLeft: 16 + (depth * 16),
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
)

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
    {groupRoutes(routes).map(section => (
      <div key={section.dirname}>
        {section.dirname && (
          <NavLink
            href={section.dirname}
            depth={section.depth - 1}>
            {section.name}
          </NavLink>
        )}
        {sort(section.routes, order).filter(filter)
        .map(route => (
          <NavLink
            {...props}
            href={route.path}
            exact={route.exact}
            depth={section.depth}>
            {route.name}
          </NavLink>
        ))}
      </div>
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
