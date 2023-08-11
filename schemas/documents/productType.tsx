import { PackageIcon } from '@sanity/icons'
import pluralize from 'pluralize'

export default {
  name: 'commonDescription',
  title: 'Common Description',
  type: 'document',
  icon: PackageIcon,
  fields: [
    // Title
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    // Slug
    {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'title' },
        validation: Rule => Rule.required()
      },
    
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      const { title } = selection
      return {
        title
      }
    }
  }
}
