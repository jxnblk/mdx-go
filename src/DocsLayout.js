import React from 'react'
import styled from 'react-emotion'
import Layout from './Layout'
import StyleProvider from './StyleProvider'
import NavLinks from './NavLinks'
import Pagination from './Pagination'

export const DocsLayout = props =>
  <StyleProvider>
    <Layout>
      <Layout.MenuToggle m={2} />
      <Layout.Sidebar
        py={3}
        bg='lightgray'>
        <NavLinks {...props} />
      </Layout.Sidebar>
      <Layout.Main>
        {props.children}
        <Pagination {...props} />
      </Layout.Main>
    </Layout>
  </StyleProvider>

export default DocsLayout
