import React from 'react'
import styled from 'react-emotion'

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

export default MenuIcon
