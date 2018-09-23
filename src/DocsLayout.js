import React from 'react'
import Layout from './Layout'
import NavLinks from './NavLinks'
import Pagination from './Pagination'
import StyleProvider from './StyleProvider'

export const DocsLayout = props =>
  <StyleProvider>
    <Layout>
      <Layout.MenuToggle
        style={{
          position: 'fixed'
        }}
      />
      <Layout.Sidebar>
        <NavLinks {...props} />
      </Layout.Sidebar>
      <Layout.Main>
        {props.children}
        <Pagination {...props} />
      </Layout.Main>
    </Layout>
  </StyleProvider>

export default DocsLayout
