import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './env'
import { schema } from './schema'

export default defineConfig({
  name: 'default',
  title: 'Podcast CMS',
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons at the top
            S.listItem()
              .title('About Page')
              .child(
                S.editor()
                  .id('aboutPage')
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
              ),
            S.listItem()
              .title('Site Settings')
              .child(
                S.editor()
                  .id('siteSettings')
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),

            // Everything else EXCEPT the singletons
            ...S.documentTypeListItems().filter(
              (item) => !['aboutPage', 'siteSettings'].includes(item.getId() as string)
            ),
          ]),

    }),
    visionTool(),
  ],

  // Restrict actions on singletons (no delete/duplicate)
  document: {
    // @ts-ignore – Sanity v3 API
    actions: (prev, { schemaType }) => {
      if (schemaType === 'aboutPage' || schemaType === 'siteSettings') {
        return prev.filter(
          (a) => a.action !== 'delete' && a.action !== 'duplicate'
        )
      }
      return prev
    },
  },
})
