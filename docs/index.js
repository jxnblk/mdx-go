import React from 'react'
import { Flex, Box } from '@rebass/grid'
import styled from 'styled-components'
import {
  Banner,
  Title,
  Text,
  Button,
  ButtonOutline,
  Container,
  Col,
  Link,
  Pre,
  Divider,
} from './components'
import Logo from './logo'
export { Root } from './components'

export const name = 'Home'

const Fex = styled(Box)`display:flex;`

const github = 'https://github.com/jxnblk/mdx-go'
const blog = 'https://jxnblk.com/writing/posts/progressive-documentation'

const intro = <span>
  mdx-go is built with the idea of <Link href={blog} color='#0a0'>Progressive Documentation</Link> in mind, intended to be used anywhere as a dev server, prototyping tool, or simple static site generator. By embracing the MDX file format, the docs you create with mdx-go can easily be used in other tools. Start your docs with mdx-go, and migrated to tools like Next.js and Gatsby when needed. You can even keep mdx-go around to use as a dev tool outside of other React applications.
</span>

export default props =>
  <Box>
    <Banner>
      <Flex px={3} py={2}>
        <Box mx='auto' />
        <Link
          href='/getting-started'
          fontSize={1}
          px={3}
          py={2}
          color='#0d0'>
          Docs
        </Link>
        <Link
          href={github}
          fontSize={1}
          px={3}
          py={2}
          color='#0d0'>
          GitHub
        </Link>
      </Flex>
      <Fex
        mx='auto'
        px={3}
        py={5}
        flexWrap='wrap'
        alignItems='center'
        _css={{
          display: 'flex',
          maxWidth: '1024px',
          minHeight: '100vh'
        }}>
        <Box
          px={3}
          width={[ 1, null, 1/3, 1/3 ]}>
          <Logo size={96} />
          <Title mb={2}>mdx-go</Title>
          <Text mb={3}>
            Lightning-fast MDX-based dev server for progressive documentation
          </Text>
          <Button mr={3} href='/getting-started'>
            Docs
          </Button>
          <ButtonOutline href={github}>
            GitHub
          </ButtonOutline>
          <Pre>npm i -g mdx-go</Pre>
        </Box>
        <Box
          px={3}
          width={[ 1, null, 2/3, 2/3 ]}>
          <video
            src='https://s3.amazonaws.com/jxnblk/mdx-go-24.mp4'
            loop
            muted
            autoPlay
            playsInline
            style={{
              maxWidth: '100%',
              borderRadius: 16,
              marginTop: 32
            }}
          />
        </Box>
      </Fex>
    </Banner>
    <Container>
      <Divider />
      <Text fontSize={[ 3, 4 ]}>
        {intro}
      </Text>
      <Divider />
      <Flex
        flexWrap='wrap'
        mx={-3}
        fontSize={[ 2, 3 ]}
        css={{
          fontWeight: 600
        }}>
        <Col>
          Zero-config dev server
        </Col>
        <Col>
          Write in markdown
        </Col>
        <Col>
          Import and use React components
        </Col>
        <Col>
          File-system based routing
        </Col>
        <Col>
          Customizable layouts
        </Col>
        <Col>
          Support for styled-components & emotion
        </Col>
        <Col>
          Export as static HTML
        </Col>
        <Col>
          Avoid lock-in and easily migrate to other MDX-based tools
        </Col>
      </Flex>
      <Divider />
    </Container>
    <Box bg='lightgray'>
      <Container>
        <Flex
          as='footer'
          fontSize={1}
          py={4}
          mx={-3}
        >
          <Link px={3} href='/getting-started'>Docs</Link>
          <Link px={3} href={github}>GitHub</Link>
          <Link px={3} href='https://jxnblk.com'>Made by Jxnblk</Link>
        </Flex>
        <Flex py={4}>
          <Box mx='auto'>
            <Link
              title='Hidden Docs'
              href='/getting-started'>
              <Logo size={48} />
            </Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  </Box>
