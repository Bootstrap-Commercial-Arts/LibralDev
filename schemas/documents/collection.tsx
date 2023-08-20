import { PackageIcon } from '@sanity/icons'
import pluralize from 'pluralize'

export default {
  name: 'collection',
  title: 'Collection',
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
    // Description
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    // Image
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    // Featured Set
    {
      title: 'Featured Set',
      name: 'featuredSet',
      type: 'setObject',
      validation: Rule => Rule.required()
    },
    // Theme
    {
      title: 'Theme',
      name: 'theme',
      type: 'string',
      options: {
        list: [
          { title: 'Red', value: 'red' },
          { title: 'Blue', value: 'blue' },
          { title: 'White', value: 'white' },
        ],
      },
    },
    // Products
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          title: 'Product',
          name: 'product',
          type: 'productWithVariant'
        }
      ],
      validation: Rule => Rule.unique()
    },
    // Sets
    {
      name: 'sets',
      title: 'Sets',
      type: 'array',
      of: [
        {
          title: 'Set',
          name: 'set',
          type: 'setObject'
        }
      ],
      validation: Rule => Rule.unique()
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
      image: 'image',
      productCount: 'products.length',
      title: 'title'
    },
    prepare(selection) {
      const { image, productCount, title } = selection
      return {
        media: image,
        subtitle: productCount ? pluralize('product', productCount, true) : 'No products',
        title
      }
    }
  }
}
