import { TagIcon } from '@sanity/icons'
import pluralize from 'pluralize'
import React from 'react'
import ProductHiddenInput from '../../components/inputs/ProductHidden'
import ProductStatusMedia from '../../components/media/ProductStatus'
import { getPriceRange } from '../../utils/getPriceRange'

export default {
  // HACK: Required to hide 'create new' button in desk structure
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  fields: [
    // Product hidden status
    {
      name: 'hidden',
      type: 'string',
      inputComponent: ProductHiddenInput,
      hidden: ({ parent }) => {
        const isActive = parent?.store?.status === 'active'
        const isDeleted = parent?.store?.isDeleted

        return isActive && !isDeleted
      }
    },
    // Title (proxy)
    {
      title: 'Title',
      name: 'titleProxy',
      type: 'proxyString',
      options: { field: 'store.title' }
    },
    // Slug (proxy)
    {
      title: 'Slug',
      name: 'slugProxy',
      type: 'proxyString',
      options: { field: 'store.slug.current' }
    },
    // Product Type
    {
      title: 'Product Type',
      name: 'productType',
      type: 'reference',
        to: {type: 'productType'},
        validation: Rule => Rule.required()
    },
    //Common Description
    {
      title: 'Common Description & Size Chart',
      name: 'commonDescription',
      type: 'reference',
        to: {type: 'commonDescription'},
        validation: Rule => Rule.required()
    },
    //Lou Says Text
    {
      name: 'louText',
      title: 'Lou Says Text',
      type: 'text',
      validation: Rule => Rule.required()
    },
    //Lou Says Link
    {
      name: 'louLink',
      title: 'Lou Says Link',
      type: 'url'
    },
    //Primary Set
    {
      title: 'Primary Set or Collection',
      name: 'primary',
      type: 'reference',
        to: [{type: 'set'},
              {type: 'collection'}],
      validation: Rule => Rule.required()

    },
    //Related Products
    {
      title: 'Related Products',
      name: 'relatedProducts',
      type: 'array',
      of: [{
        type: 'reference',
          to: [{type: 'product'}]
      }],
      validation: Rule => Rule.required().min(2).max(5).unique()
    },
    // Shopify product
    {
      name: 'store',
      title: 'Shopify',
      type: 'shopifyProduct',
      description: 'Product data from Shopify (read-only)'
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo.product'
    }
  ],
  orderings: [
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'store.title', direction: 'asc' }]
    },
    {
      title: 'Title (Z-A)',
      name: 'titleAsc',
      by: [{ field: 'store.title', direction: 'desc' }]
    },
    {
      title: 'Price (Highest first)',
      name: 'titleAsc',
      by: [{ field: 'store.priceRange.minVariantPrice', direction: 'desc' }]
    },
    {
      title: 'Title (Lowest first)',
      name: 'titleAsc',
      by: [{ field: 'store.priceRange.minVariantPrice', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      optionCount: 'store.options.length',
      previewImageUrl: 'store.previewImageUrl',
      priceRange: 'store.priceRange',
      status: 'store.status',
      title: 'store.title',
      variantCount: 'store.variants.length'
    },
    prepare(selection) {
      const { isDeleted, optionCount, previewImageUrl, priceRange, status, title, variantCount } =
        selection

      let description = [
        variantCount ? pluralize('variant', variantCount, true) : 'No variants',
        optionCount ? pluralize('option', optionCount, true) : 'No options'
      ]

      let subtitle = getPriceRange(priceRange)
      if (status !== 'active') {
        subtitle = '(Unavailable in Shopify)'
      }
      if (isDeleted) {
        subtitle = '(Deleted from Shopify)'
      }

      return {
        media: (
          <ProductStatusMedia
            isActive={status === 'active'}
            isDeleted={isDeleted}
            type="product"
            url={previewImageUrl}
          />
        ),
        description: description.join(' / '),
        subtitle,
        title
      }
    }
  }
}
