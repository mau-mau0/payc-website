import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // Footer – Newsletter
    defineField({
      name: 'newsletter',
      title: 'Footer Newsletter',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', initialValue: 'Weekly wisdom straight to your inbox.' }),
        defineField({ name: 'subtext', type: 'text', rows: 3, initialValue: 'Join the PAYC community for insights, resources, and next steps.' }),
        defineField({ name: 'ctaLabel', type: 'string', initialValue: 'Subscribe' }),
        defineField({ name: 'enabled', type: 'boolean', initialValue: false, description: 'Toggle on when you wire a real provider' }),
      ],
    }),

    // Footer – Social links
    defineField({
      name: 'socials',
      title: 'Social Profiles',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'network', type: 'string', title: 'Network',
            options: { list: ['X','Instagram','Facebook','LinkedIn','YouTube','Pinterest','TikTok'] },
            validation: r => r.required()
          }),
          defineField({ name: 'url', type: 'url', validation: r => r.required() }),
          defineField({ name: 'label', type: 'string', description: 'Optional aria-label override' }),
        ],
        preview: { select: { title: 'network', subtitle: 'url' } }
      }],
    }),


    // Footer – Legal links row
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', validation: r => r.required() }),
          defineField({ name: 'href', type: 'string', validation: r => r.required() }),
        ],
        preview: { select: { title: 'label', subtitle: 'href' } }
      }],
      initialValue: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Site Credits', href: '/credits' },
      ],
    }),

    // Footer – Blurb
    defineField({
      name: 'footerBlurb',
      title: 'Footer Blurb',
      type: 'text',
      rows: 3,
      initialValue:
        'PAYC (Pull As You Climb) shares real stories, mentors, and practical steps so young people—especially from underrepresented communities—can build skills, careers, and community.',
    }),

    // Footer – Copyright name (defaults to PAYC)
    defineField({ name: 'copyrightName', title: 'Copyright Name', type: 'string', initialValue: 'PAYC' }),
  ],
})
