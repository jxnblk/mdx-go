import React from 'react'
import {
  Head,
  Link as GoLink,
  StyleProvider,
} from 'superdev'
import { Box, Flex } from 'rebass'
import Sidepane from 'sidepane'
import Logo from './logo'

const green = '#0d3'
const darkgreen = '#0a6'
const black = '#000619'
const lightgray = '#f6f6ff'
const blue = '#07c'


const gradient = `
linear-gradient(
  150deg,
  transparent 90%,
  rgba(0, 191, 0, 0.25) 90%,
  rgba(0, 191, 0, 0.25) 95%,
  rgba(0, 191, 0, 0.5) 95%
)
`

const nav = [
  { path: '/', name: 'Home' },
  { path: '/getting-started', name: 'Getting-Started' },
  { path: '/using-mdx', name: 'Using-MDX' },
  { path: '/routing', name: 'Routing' },
  { path: '/configuration', name: 'Configuration' },
  { path: '/exporting', name: 'Exporting' },
  { path: '/Head', name: 'Head' },
  { path: '/Link', name: 'Link' },
  { path: '/examples', name: 'Examples' },

  // 'ComponentProvider',
  // 'Layout',
  // 'NavLinks',
  // 'Pagination',
  // 'StyleProvider',
  // 'DocsLayout',
  // 'DevLayout',
  // Examples
  // 'Typography',
]

// todo: update
const theme = {
  colors: {
    lightgray,
    black,
    blue,
    green,
    darkgreen,
  },
  code: {
    color: darkgreen
  },
  pre: {
    // color: darkgreen
  }
}

const PageLayout = props => props.location.pathname === '/'
  ? props.children
  : (
    <Flex>
      <Sidepane
        bg='#f6f6ff'>
        <Box px={3} py={3}>
          <GoLink href='/'>
            <Logo size={48} />
          </GoLink>
        </Box>
        {nav.map(({ name, path }) => (
          <GoLink
            key={path}
            href={path}
            children={name}
            style={{
              display: 'block',
              fontWeight: 'bold',
              fontSize: 14,
              textDecoration: 'none',
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 4,
              paddingBottom: 4,
              color: 'inherit',
            }}
          />
        ))}
        {/*
        <NavLinks
          {...props}
          filter={route => nav.includes(route.name)}
          order={nav}
          py={2}
        />
        <Box py={2} />
        <NavLink
          href='https://github.com/jxnblk/mdx-go'
          children='GitHub'
        />
        */}
        <Box py={4} />
      </Sidepane>
      <Box width={1}>
        <Container maxWidth='768px' py={5}>
          {props.children}
        </Container>
      </Box>
    </Flex>
  )

export const Root = props =>
  <React.Fragment>
    <Head>
      <title>Superdev</title>
      <meta name='description' content='Lightning-fast MDX-based dev server' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@jxnblk' />
      <meta name='twitter:title' content='Superdev' />
      <meta name='twitter:description' content='Lightning-fast MDX-based dev server for progressive documentation' />
      <meta name='twitter:image' content='https://jxnblk.com/mdx-go/card.png' />
    </Head>
    <StyleProvider color='tomato'>
      <PageLayout {...props} />
    </StyleProvider>
  </React.Fragment>


export const Banner = props =>
  <Box
    {...props}
    color='white'
    bg={black}
    css={{
      backgroundSize: 'cover',
      backgroundImage: gradient
    }}
  />

export const Title = props =>
  <Box
    {...props}
    as='h1'
    m={0}
    fontSize={[ 6, 7 ]}
    css={{
      fontWeight: 600
    }}
  />

export const Text = props =>
  <Box
    as='p'
    m={0}
    {...props}
    css={{
      fontWeight: 600
    }}
  />

export const Button = props =>
  <Box
    as={GoLink}
    px={4}
    py={3}
    fontSize={2}
    color={black}
    bg={green}
    {...props}
    css={{
      display: 'inline-block',
      fontWeight: 600,
      textDecoration: 'none',
      borderRadius: '2px',
      ...props.css
    }}
  />

export const ButtonOutline = props =>
  <Button
    {...props}
    color={green}
    bg='transparent'
    css={{
      boxShadow: 'inset 0 0 0 2px'
    }}
  />

export const Container = ({ maxWidth, ...props }) =>
  <Box
    {...props}
    mx='auto'
    px={4}
    css={{
      maxWidth
    }}
  />
Container.defaultProps = {
  maxWidth: '1024px'
}

export const Col = props =>
  <Box
    {...props}
    px={3}
    py={3}
    width={[ 1, 1/2, ]}
  />

export const Link = props =>
  <Box
    {...props}
    as={GoLink}
    css={{
      display: 'inline-block',
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 600,
      '&:hover': {
        color: green
      }
    }}
  />

export const Pre = props =>
  <Box
    {...props}
    as='pre'
    color={green}
    fontSize={2}
    css={{
      fontFamily: 'Menlo, monospace',
    }}
  />

export const Divider = props =>
  <Box
    {...props}
    as='hr'
    my={5}
    width={128}
    ml={0}
    bg={green}
    css={{
      border: 0,
      height: '4px'
    }}
  />
