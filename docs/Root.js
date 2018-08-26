import React from 'react'
import { Head } from '..'
import { BaseTheme } from 'mdx-themes'

export const Root = props =>
  <BaseTheme>
    <Head>
      <title>mdx-go</title>
      <meta name='description' content='Lightning-fast MDX-based dev server' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@jxnblk' />
      <meta name='twitter:title' content='mdx-go' />
      <meta name='twitter:description' content='Lightning-fast MDX-based dev server' />
      <meta name='twitter:image' content='https://jxnblk.com/mdx-go/card.png' />
    </Head>
    {props.children}
  </BaseTheme>
