import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'resourceCategory' }],
      validation: r => r.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: { list: ['article','video','tool','book','course','podcast','community','other'] },
      initialValue: 'article',
    }),
    defineField({ name: 'url', type: 'url', validation: r => r.required() }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      description: 'One-sentence “why this matters” summary',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Use short, searchable labels (e.g., resume, interview, python)',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'coverImage' },
  },
})
