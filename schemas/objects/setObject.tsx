import { TagIcon } from '@sanity/icons'
import sanityClient from 'part:@sanity/base/client'
import pluralize from 'pluralize'
import React from 'react'
import ProductStatusMedia from '../../components/media/ProductStatus'
import { SANITY_API_VERSION } from '../../constants'
import { getPriceRange } from '../../utils/getPriceRange'

export default {
  name: 'setObject',
  title: 'Set',
  type: 'object',
  icon: TagIcon,
  fields: [
    {
      name: 'set',
      type: 'reference',
      weak: true,
      to: [{ type: 'set' }]
    },
    
  ],
  preview: {
    select: {
      title: 'set.title',
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
