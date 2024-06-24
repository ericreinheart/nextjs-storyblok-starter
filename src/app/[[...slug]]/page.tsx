import {
  getStoryblokApi,
  ISbStoriesParams,
  StoryblokComponent,
} from '@storyblok/react/rsc'
import { notFound } from 'next/navigation'
import type {
  Metadata,
  // ResolvingMetadata
} from 'next'

import { Layout } from '@/components/core'
import { isProduction } from '@/lib'

type PageProps = {
  params: { slug: string[] | undefined }
}

async function fetchData(props: {
  slug: string[]
  sbParams: ISbStoriesParams
}) {
  const { slug, sbParams } = props

  const storyblokApi = getStoryblokApi()

  try {
    if (isProduction) {
      const res = await storyblokApi.get(`cdn/stories/${slug[0]}`, sbParams)

      return res
    }

    const res = await storyblokApi?.get(`cdn/stories/${slug[0]}`, sbParams)

    console.log('res', res)

    return res
  } catch (e) {
    console.log('e', e)

    return notFound()
  }
}

export async function generateMetadata(
  { params }: PageProps,
  // parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = params

  const res = await fetchData({
    slug: slug || ['home'],
    sbParams: {
      version: isProduction ? 'published' : 'draft',
    },
  })

  const metaData = res?.data.story.content as {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    ogType: 'website' | 'article'
    ogUrl: string
    isNoIndex: boolean
  }

  return {
    metadataBase: new URL('https://example.com/'),
    title: metaData.title,
    description: metaData.description,
    openGraph: {
      title: metaData.ogTitle,
      description: metaData.ogDescription,
      type: metaData.ogType || 'website',
      url: metaData.ogUrl,
    },
    robots: {
      index: !metaData.isNoIndex,
    },
  }
}

export default async function StoryblokPage(props: PageProps) {
  const { slug } = props.params

  const sbParams: ISbStoriesParams = {
    version: isProduction ? 'published' : 'draft',
  }

  const res = await fetchData({
    slug: slug || ['home'],
    sbParams: {
      ...sbParams,
    },
  })

  return <StoryblokComponent blok={res?.data.story.content} />
}
