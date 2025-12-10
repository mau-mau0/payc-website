import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource as SanityImageSourceType } from '@sanity/image-url/lib/types/types'
import { sanityClient } from './client'

// Export a type that includes null/undefined for optional image sources in components
export type SanityImageSource = SanityImageSourceType | null | undefined

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source: SanityImageSource): ReturnType<typeof builder.image> {
  // Callers should check for null/undefined before calling this function
  // This assertion is safe because the function is only called after null checks
  return builder.image(source as SanityImageSourceType)
}
