import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
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
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: link directly to the one About Page doc with fixed ID
            S.listItem()
              .title('About Page')
              .child(
                S.editor()
                  .id('aboutPage')
                  .schemaType('aboutPage')
                  .documentId('aboutPage') // fixed ID enforces singleton pattern
              ),

            // All other document types except aboutPage
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'aboutPage'),
          ]),
    }),
    visionTool(),
  ],

  // Optional: restrict actions on the singleton (no duplicate/delete)
  document: {
    // @ts-ignore -- this API exists in Sanity v3
    actions: (prev, { schemaType }) => {
      if (schemaType === 'aboutPage') {
        return prev.filter(
          (action) => action.action !== 'delete' && action.action !== 'duplicate'
        )
      }
      return prev
    },
  },
})
