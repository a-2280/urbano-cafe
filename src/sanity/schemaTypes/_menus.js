import { defineField, defineType } from "sanity";

export const menus = defineType({
  name: "menus",
  title: "Menus",
  type: "document",
  fields: [
    defineField({
      name: "menus",
      type: "array",
      of: [
        defineField({
            name: "menu",
            type: "object",
            fields: [
                defineField({
                    name: "sheetName",
                    title: "Google Sheet Tab Name",
                    type: "string",
                    description: "Must match the exact tab name in the Google Sheet",
                    validation: (rule) => rule.required()
                }),
                defineField({
                    name: "title",
                    title: "Title",
                    type: "image",
                    validation: (rule) => rule.required()
                }),
                defineField({
                    name: "cssClass",
                    title: "CSS Class",
                    type: "string",
                    description: "Used for styling. Do not change.",
                    validation: (rule) => rule.required()
                }),
                defineField({
                    name: "imageOne",
                    title: "Image One",
                    type: "image"
                }),
                defineField({
                    name: "imageTwo",
                    title: "Image Two",
                    type: "image"
                }),
                defineField({
                    name: "imageThree",
                    title: "Image Three",
                    type: "image"
                }),
                defineField({
                    name: "warning",
                    type: "text"
                }),
            ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Menus" };
    },
  },
});