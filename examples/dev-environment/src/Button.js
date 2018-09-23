import styled from 'react-emotion'
import { space, color } from 'styled-system'

const Button = styled('button')({
  appearance: 'none',
  border: 0,
  borderRadius: '4px',
  display: 'inline-block',
  fontSize: '14px',
  fontFamily: 'inherit',
  fontWeight: 600,
}, space, color)

Button.defaultProps = {
  px: 3,
  py: 2,
  color: 'white',
  bg: '#c0c'
}

export default Button
