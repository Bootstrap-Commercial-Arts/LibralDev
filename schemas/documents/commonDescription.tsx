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
    // Description
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    //Size Chart
    {
        name: 'sizeChart',
        title: 'Size Chart',
        type: 'text'
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
