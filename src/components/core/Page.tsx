import {
  storyblokEditable,
  StoryblokComponent,
  SbBlokData,
} from '@storyblok/react/rsc'

export function Page({ blok }: { blok: SbBlokData & { body: SbBlokData[] } }) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  )
}
