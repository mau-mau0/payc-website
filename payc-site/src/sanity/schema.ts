import { type SchemaTypeDefinition } from 'sanity'
import podcastCategory from './schemas/podcastCategory'
import episode from './schemas/episode'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [episode, podcastCategory],
}
