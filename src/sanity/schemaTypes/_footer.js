import { defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Press Title",
      type: "string",
    }),
    defineField({
      name: "pressLinks",
      title: "Press Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Publication Name", type: "string" }),
            defineField({ name: "link", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "instagramLink", title: "Instagram Link", type: "string" }),
    defineField({ name: "careersLink", title: "Careers Link", type: "string" }),
    defineField({ name: "description", title: "Description", type: "string" }),
    defineField({ name: "copyright", title: "Copyright", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
