import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // Hero image shown behind the page title
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for accessibility',
          validation: r => r.required(),
        }),
      ],
      description: 'Large banner image behind the title.',
    }),

    // Main mission text (Portable Text). First three blocks show by default.
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The page shows the first three paragraphs by default.',
      validation: r => r.min(1),
    }),

    // Quote
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Quote Text', type: 'text', rows: 2, validation: r => r.required() }),
        defineField({ name: 'attribution', title: 'Attribution', type: 'string' }),
      ],
    }),

    // Pillars (max 5)
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      of: [
        defineField({
          name: 'pillar',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: r => r.required() }),
            defineField({ name: 'description', type: 'text', rows: 3, validation: r => r.required() }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
      validation: r => r.max(5),
      description: 'Key pillars (up to 5).',
    }),

    // Impact metrics (min 3, max 10)
    defineField({
      name: 'metrics',
      title: 'Impact Metrics',
      type: 'array',
      of: [
        defineField({
          name: 'metric',
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Big Number / Value', type: 'string', validation: r => r.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: r => r.required() }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
      validation: r => r.min(3).max(10),
      description: 'Add between 3 and 10 metrics.',
    }),
  ],
})
