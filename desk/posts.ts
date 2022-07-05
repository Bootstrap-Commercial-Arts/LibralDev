import S from '@sanity/desk-tool/structure-builder'


// prettier-ignore
export const posts = S.listItem()
  .title('Posts')
  .schemaType('post')
  .child(
    S.documentTypeList('post')
  )
