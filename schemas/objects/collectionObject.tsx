import { TagIcon } from '@sanity/icons'
import sanityClient from 'part:@sanity/base/client'
import pluralize from 'pluralize'
import React from 'react'
import ProductStatusMedia from '../../components/media/ProductStatus'
import { SANITY_API_VERSION } from '../../constants'
import { getPriceRange } from '../../utils/getPriceRange'

export default {
  name: 'collectionObject',
  title: 'Collection',
  type: 'object',
  icon: TagIcon,
  fields: [
    {
      name: 'collection',
      type: 'reference',
      weak: true,
      to: [{ type: 'collection' }]
    },
    
  ],
  preview: {
    select: {
      title: 'collection.title',
    },
    prepare(selection) {
      const {
        title,
      } = selection

      let previewTitle = [title]



      

      return {
        title: previewTitle.join(' '),
      }
    }
  }
}
