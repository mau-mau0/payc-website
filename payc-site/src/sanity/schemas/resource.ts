import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Book', value: 'book' },
          { title: 'Organization', value: 'organization' },
          { title: 'Charity', value: 'charity' },
          { title: 'Website', value: 'website' },
          { title: 'Course', value: 'course' },
          { title: 'Tool', value: 'tool' },
        ],
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
      validation: r => r.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Why this matters',
      type: 'text',
      rows: 3,
      description: 'Short description of how this helped (from guest or PAYC).',
    }),
    defineField({
      name: 'recommendedBy',
      title: 'Recommended By',
      type: 'string',
      description: 'Guest name or “PAYC Team” etc.',
    }),
    defineField({
      name: 'recommendedRole',
      title: 'Role / Context',
      type: 'string',
      description: 'e.g. Software Engineer, Educator, Founder.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional labels like “money”, “coding”, “college”, “mindset”.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'kind',
    },
  },
})
