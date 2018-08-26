import React from 'react'
import Logo from './logo'

export default ({
  width = 1024,
  color = '#0d0',
  bg = '#000'
}) =>
  <svg
    viewBox='0 0 256 128'
    width={width}
    height={width / 2}
    >
    <rect
      fill={bg}
      width='256'
      height='128'
    />
    <g transform='translate(80 16)'>
      <Logo
        bg={color}
        size={96}
      />
    </g>
  </svg>
