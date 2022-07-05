import S from '@sanity/desk-tool/structure-builder'


// prettier-ignore
export const rooms = S.listItem()
  .title('Rooms')
  .schemaType('room')
  .child(
    S.documentTypeList('room')
  )
