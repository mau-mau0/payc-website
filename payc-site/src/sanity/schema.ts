import { type SchemaTypeDefinition } from 'sanity'
import episode from './schemas/episode'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [episode],
}
