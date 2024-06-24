import { isProduction } from '@/lib'
import { ISbStoriesParams, getStoryblokApi } from '@storyblok/react/rsc'

async function fetchData(props: { sbParams: ISbStoriesParams }) {
  const { sbParams } = props

  const storyblokApi = getStoryblokApi()

  if (isProduction) {
    return storyblokApi.get(`cdn/stories`, sbParams)
  }

  return storyblokApi?.get(`cdn/stories`, sbParams)
}

export async function generateStaticParams() {
  if (!isProduction) {
    return []
  }

  const { data }: { data: { stories: { slug: string }[] } } = await fetchData({
    sbParams: {
      version: isProduction ? 'published' : 'draft',
    },
  })

  const paths = data.stories.map(({ slug }) => {
    return {
      slug: slug === 'home' ? undefined : [slug],
    }
  })

  return paths
}

export default async function SlugLayout({
  params: { slug },
  children,
}: {
  params: { slug: string[] }
  children: React.ReactNode
}) {
  return <>{children}</>
}
