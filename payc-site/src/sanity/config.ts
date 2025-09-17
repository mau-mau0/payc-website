import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { projectId, dataset, apiVersion } from './env'
import { schema } from './schema'

export default defineConfig({
  name: 'default',
  title: 'Podcast CMS',
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema,
})
