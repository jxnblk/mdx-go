import React from 'react'
import Layout from './Layout'
import NavLinks from './NavLinks'

export const DevLayout = props =>
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
    </Layout.Main>
  </Layout>
