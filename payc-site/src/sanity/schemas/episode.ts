import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'episode',
  title: 'Episode',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'episodeNumber', type: 'string', title: 'Episode # (e.g. 712)' }),
    defineField({ name: 'date', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({
        name: 'coverImage',
        title: 'Cover Image',
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', type: 'string', title: 'Alt text', description: 'Describe the image for accessibility' },
        ],
        validation: r => r.required(),
      }),
    defineField({ name: 'summary', type: 'text' }),
    defineField({ name: 'guest', type: 'string' }),
    defineField({ name: 'spotifyEmbedUrl', type: 'url', title: 'Spotify Embed URL' }),
    defineField({ name: 'youtubeUrl', type: 'url', title: 'YouTube URL' }),
  ],
})
