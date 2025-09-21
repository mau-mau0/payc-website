import { type SchemaTypeDefinition } from 'sanity'
import podcastCategory from './schemas/podcastCategory'
import episode from './schemas/episode'
import aboutPage from './schemas/aboutPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [episode, podcastCategory, aboutPage],
}
