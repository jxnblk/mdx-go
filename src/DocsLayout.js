import React from 'react'
import Layout from './Layout'
import NavLinks from './NavLinks'
import Pagination from './Pagination'

export const DocsLayout = props =>
  <Layout>
    <Layout.MenuToggle m={2} />
    <Layout.Sidebar
      style={{
        paddingTop: 32,
        paddingBottom: 32,
      }}
      >
      <NavLinks {...props} />
    </Layout.Sidebar>
    <Layout.Main>
      {props.children}
      <Pagination {...props} />
    </Layout.Main>
  </Layout>

export default DocsLayout
