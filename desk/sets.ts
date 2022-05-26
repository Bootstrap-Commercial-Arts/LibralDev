import S from '@sanity/desk-tool/structure-builder'

// prettier-ignore
export const sets = S.listItem()
  .title('Sets')
  .schemaType('set')
  .child(
    S.documentTypeList('set')
  )
