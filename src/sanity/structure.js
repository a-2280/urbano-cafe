// https://www.sanity.io/docs/structure-builder-cheat-sheet
import { schema as schemaConfig, singletonTypes } from "./schemaTypes";

export const structure = (S) =>
  S.list()
    .title("Content")
    .items(
      schemaConfig.types.map((type) =>
        singletonTypes.has(type.name)
          ? S.listItem()
              .title(type.title ?? type.name)
              .child(
                S.document()
                  .schemaType(type.name)
                  .documentId(type.name)
              )
          : S.documentTypeListItem(type.name)
      )
    );
