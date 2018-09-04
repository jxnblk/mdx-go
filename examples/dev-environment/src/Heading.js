import styled from 'react-emotion'
import { space, fontSize, color } from 'styled-system'

const Heading = styled('h2')({
  fontSize: '14px',
  fontWeight: 600,
}, space, fontSize, color)

Heading.defaultProps = {
  fontSize: 5,
  m: 0
}

export default Heading
