import { Link as ReachLink } from '@reach/router'

export const Link = ({
  href,
  ...props
}) =>
  <ReachLink
    to={href}
    {...props}
  />

