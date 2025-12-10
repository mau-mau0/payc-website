import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resourceCategory',
  title: 'Resource Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'description', type: 'text' }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
})
