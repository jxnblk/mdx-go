import React from 'react'
import Layout from './Layout'
import StyleProvider from './StyleProvider'
import NavLinks from './NavLinks'
import ScrollTop from './ScrollTop'

export const DevLayout = props =>
  <StyleProvider>
    <Layout>
      <Layout.MenuToggle m={2} />
      <Layout.Sidebar>
        <NavLinks {...props} />
      </Layout.Sidebar>
      <Layout.Main>
        {props.children}
      </Layout.Main>
    </Layout>
    <ScrollTop />
  </StyleProvider>
