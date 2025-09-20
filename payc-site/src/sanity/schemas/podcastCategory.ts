import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'podcastCategory',
  title: 'Podcast Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'order', type: 'number', description: 'Lower shows first', initialValue: 0 }),
  ],
  preview: { select: { title: 'title' } },
})
