import { BookIcon } from '@sanity/icons'
import { validateSlug } from '../../utils/validateSlug'

export default {
  name: 'room',
  title: 'Room',
  type: 'document',
  icon: BookIcon,
  fields: [
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title displayed in browser tab / search engine results',
      validation: Rule => Rule.required()
    },
    // Slug
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: validateSlug
    },
    // Body
    {
      name: 'body',
      title: 'Body',
      type: 'body'
    },
    // Image
    {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
        validation: Rule => Rule.required()
      },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo.standard'
    }
  ],
  preview: {
    select: {
      active: 'active',
      thumbnail: 'thumbnail',
      title: 'title'
    },
    prepare(selection) {
      const { thumbnail, title } = selection

      return {
        media: thumbnail,
        title
      }
    }
  }
}
