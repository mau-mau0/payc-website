import { type SchemaTypeDefinition } from 'sanity'
import podcastCategory from './schemas/podcastCategory'
import episode from './schemas/episode'
import aboutPage from './schemas/aboutPage'
import siteSettings from './schemas/siteSettings'
import resource from './schemas/resource'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [episode, podcastCategory, aboutPage, siteSettings, resource],
}
