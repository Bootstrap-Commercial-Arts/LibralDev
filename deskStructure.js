/**
 * Desk structure overrides
 *
 * This file configure how documents are structured in the Studio's desk tool.
 * It works because
    {
      "name": "part:@sanity/desk-tool/structure",
      "path": "./deskStructure.js"
    },
  * is added to the `parts` array in `/sanity.json`.
  *
  * Sanity Studio automatically lists document types out of the box.
  * With this custom desk structure we achieve things like showing the `home`
  * and `settings` document types as singletons, and grouping product details
  * and variants for easy editorial access.
  *
  * You can customize this even further as your schemas progress.
  * To learn more about structure builder, visit our docs:
  * https://www.sanity.io/docs/overview-structure-builder
 */

import S from '@sanity/desk-tool/structure-builder'
import { posts } from './desk/posts'
import { rooms } from './desk/rooms'
import { collections } from './desk/collections'
import { sets } from './desk/sets'
import { home } from './desk/home'
import { products } from './desk/products'
import { settings } from './desk/settings'
import { commonDescriptions } from './desk/commonDescriptions'
import { productTypes } from './desk/productType'

// If you add document types to desk structure manually, you can add them to this array to prevent duplicates in the root pane
const DOCUMENT_TYPES_IN_STRUCTURE = [
  'post',
  'room',
  'collection',
  'set',
  'home',
  'media.tag',
  'page',
  'product',
  'productVariant',
  'settings',
  'commonDescription',
  'productTypes'
]

export default () => {
  // prettier-ignore
  return (
    S.list()
      .title('Content')
      .items([
        home,
        posts,
        rooms,
        S.divider(),
        collections,
        sets,
        products,
        commonDescriptions,
        productTypes,
        S.divider(),
        settings
      ])
  )
}
