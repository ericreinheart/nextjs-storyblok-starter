import '../styles/globals.css'

import type { Metadata } from 'next'

import { Layout, Page } from '@/components/core'
import { cx } from '@/utils'
import {
  StoryblokBridgeLoader,
  apiPlugin,
  storyblokInit,
} from '@storyblok/react/rsc'
import { HeroSection } from '@/components/sections'
import { isProduction } from '@/lib'

export const metadata: Metadata = {
  title: 'NextJS Starter',
  description: ':)',
}

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    HeroSection: HeroSection,
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cx('bg-white text-black dark:bg-black dark:text-white')}>
        <Layout>{children}</Layout>
      </body>
      <StoryblokBridgeLoader options={{}} />
    </html>
  )
}
