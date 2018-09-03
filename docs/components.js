import React from 'react'
import {
  Head,
  Layout,
  NavLinks,
  ComponentProvider,
} from 'mdx-go'
import { Box, Flex } from 'grid-styled/emotion'


const green = '#0d0'
const black = '#001600'

const gradient = `
linear-gradient(
  150deg,
  transparent 90%,
  rgba(0, 191, 0, 0.25) 90%,
  rgba(0, 191, 0, 0.25) 95%,
  rgba(0, 191, 0, 0.5) 95%
)
`

const PageLayout = props => props.location.pathname === '/'
  ? props.children
  : (
    <Layout>
      <Layout.Sidebar>
        <NavLinks {...props} />
      </Layout.Sidebar>
      <Layout.Main>
        <Layout.MenuToggle>
          Menu
        </Layout.MenuToggle>
        {props.children}
      </Layout.Main>
    </Layout>
  )

export const Root = props =>
  <React.Fragment>
    <Head>
      <title>mdx-go</title>
      <meta name='description' content='Lightning-fast MDX-based dev server' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@jxnblk' />
      <meta name='twitter:title' content='mdx-go' />
      <meta name='twitter:description' content='Lightning-fast MDX-based dev server for progressive documentation' />
      <meta name='twitter:image' content='https://jxnblk.com/mdx-go/card.png' />
    </Head>
    <ComponentProvider>
      <PageLayout {...props} />
    </ComponentProvider>
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
    is='h1'
    m={0}
    fontSize={[ 6, 7 ]}
    css={{
      fontWeight: 600
    }}
  />

export const Text = props =>
  <Box
    is='p'
    m={0}
    {...props}
    css={{
      fontWeight: 600
    }}
  />

export const Button = props =>
  <Box
    {...props}
    is='a'
    px={4}
    py={2}
    fontSize={1}
    color={black}
    bg={green}
    css={{
      display: 'inline-block',
      fontWeight: 600,
      textDecoration: 'none',
      borderRadius: '8px'
    }}
  />

export const Container = props =>
  <Box
    {...props}
    mx='auto'
    px={4}
    css={{
      maxWidth: '1024px'
    }}
  />

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
    is='a'
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
    is='pre'
    color={green}
    fontSize={2}
    css={{
      fontFamily: 'Menlo, monospace',
    }}
  />

export const Divider = props =>
  <Box
    {...props}
    is='hr'
    my={5}
    width={128}
    ml={0}
    bg={green}
    css={{
      border: 0,
      height: '4px'
    }}
  />
