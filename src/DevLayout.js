import React from 'react'
import Layout from './Layout'
import NavLinks from './NavLinks'

export const DevLayout = props =>
  <Layout>
    <Layout.MenuToggle m={2} />
    <Layout.Sidebar
      bg='#f9f9f9'
      style={{
        paddingTop: 32,
        paddingBottom: 32,
      }}>
      <NavLinks {...props} />
    </Layout.Sidebar>
    <Layout.Main>
      {props.children}
    </Layout.Main>
  </Layout>
