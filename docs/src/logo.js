import React from 'react'

// forward //
const forward = [
  'M 16 0',
  'L 48 0',
  'L 32 32',
  'L 0 32',
  'z',
].join(' ')

// \\
const backward = [
  'M 0 0',
  'L 32 0',
  'L 48 32',
  'L 16 32',
  'z',
].join(' ')

export default ({
  size = 256,
  color = '#fff',
  bg = '#0d0'
}) =>
  <svg
    viewBox='0 0 160 160'
    width={size}
    height={size}>
    <circle
      fill={bg}
      cx='80'
      cy='80'
      r='80'
    />
    <g fill={color} transform='translate(20 60)'>
      <path transform='translate(24 0)' d={backward} />
      <path transform='translate(72 0)' d={backward} />
      <path transform='translate(24 0)' fill={bg} opacity={1/4} d={backward} />
      <path transform='translate(72 0)' fill={bg} opacity={1/4} d={backward} />
      <path transform='translate(0 0)' d={forward} />
      <path transform='translate(48 0)' d={forward} />
    </g>
  </svg>
