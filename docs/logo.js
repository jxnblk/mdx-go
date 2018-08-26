import React from 'react'

const M = [
  'M 0 0',
  'L 10 5',
  'L 20 0',
  'L 20 20',
  'L 0 20',
  'z'
].join(' ')

const X = [
  'M 0 0',
  'L 32 32',
  'M 32 0',
  'L 0 32'
].join(' ')

// //
const F = [
  'M 16 0',
  'L 48 0',
  'L 32 32',
  'L 0 32',
  'z',
].join(' ')

// \\
const B = [
  'M 0 0',
  'L 32 0',
  'L 48 32',
  'L 16 32',
  'z',
].join(' ')

export default ({
  width = 1024,
  color = 'tomato',
  bg = '#200'
}) =>
  <svg
    viewBox='0 0 128 64'
    width={width}
    height={width / 2}
    style={{
      fontFamily: '"Avenir Next", system-ui, sans-serif',
      fontWeight: 700,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.5em'
    }}
  >
    <rect
      fill={bg}
      width='128'
      height='64'
    />
    <g fill={color}>
      <path transform='translate(28 16)' d={B} />
      <path transform='translate(76 16)' d={B} />
      <path transform='translate(28 16)' fill='#000' opacity={1/4} d={B} />
      <path transform='translate(76 16)' fill='#000' opacity={1/4} d={B} />
      <path transform='translate(4 16)' d={F} />
      <path transform='translate(52 16)' d={F} />
    </g>
  </svg>

const colors = {
  dark: '#2a2824',
  paper: '#fea',
  green: '#0f0',
  darkgreen: '#0c0',
  black: '#000'
}

const circle = (
<g fill='#030'>
  <circle
    cx='64'
    cy='32'
    r='16'
  />
  <rect
    fill='#000'
    width='20'
    height='20'
    transform='translate(54 22)'
  />
  <path
    fill='none'
    stroke='#000'
    strokeWidth='2'
    d={X}
    transform='translate(48 16)'
  />
  <circle
    fill='none'
    stroke='#000'
    strokeWidth='0.5'
    cx='64'
    cy='32'
  />
</g>
)

const text = (
  <g>
    <g fill='none' stroke='#0ff' strokeWidth='0.125'>
      <rect x='40' y='12' width='48' height='2' />
      <rect x='36' y='16' width='56' height='2' />
      <rect x='34' y='20' width='60' height='2' />
      <rect
        x='32'
        y='24'
        width='64'
        height='16'
      />
      <rect x='34' y='42' width='60' height='2' />
      <rect x='36' y='46' width='56' height='2' />
      <rect x='40' y='50' width='48' height='2' />
    </g>
    <text
      x='64'
      y='36.5'
      fill='#0f0'
      textAnchor='middle'
    >
      MDXS
    </text>
  </g>
)

const wires = (
  <g
    transform='translate(48 16)'
    fill='none'
    stroke='#0f0'
    strokeWidth='.125'>
    <path
      d={[
        'M 0 0',
        'L 32 32',
        'L 0 32',
        'z',
        'M 32 0',
        'L 0 32',
        'L 32 32',
        'z'
      ].join(' ')}
    />
  </g>
)
