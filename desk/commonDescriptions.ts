import S from '@sanity/desk-tool/structure-builder'

// prettier-ignore
export const commonDescriptions = S.listItem()
  .title('Common Descriptions')
  .schemaType('commonDescription')
  .child(
    S.documentTypeList('commonDescription')
  )
