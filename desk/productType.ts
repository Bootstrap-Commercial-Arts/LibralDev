import S from '@sanity/desk-tool/structure-builder'

// prettier-ignore
export const productTypes = S.listItem()
  .title('Product Types')
  .schemaType('productType')
  .child(
    S.documentTypeList('productType')
  )
