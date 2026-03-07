import { defineField, defineType } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reservation",
      type: "object",
      fields: [
        defineField({
          name: "reservationText",
          title: "Reservation Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "reservationLink",
          title: "Reservation Link",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Header Text",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hours",
      title: "Store Hours",
      type: "object",
      fields: [
        defineField({
          name: "openTime",
          title: "Open Time (24hr)",
          type: "number",
          validation: (rule) => rule.required().min(0).max(23),
        }),
        defineField({
          name: "closeTime",
          title: "Close Time (24hr)",
          type: "number",
          validation: (rule) => rule.required().min(0).max(23),
        }),
        defineField({
          name: "days",
          title: "Days Open",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: [
              { title: "Monday", value: "monday" },
              { title: "Tuesday", value: "tuesday" },
              { title: "Wednesday", value: "wednesday" },
              { title: "Thursday", value: "thursday" },
              { title: "Friday", value: "friday" },
              { title: "Saturday", value: "saturday" },
              { title: "Sunday", value: "sunday" },
            ],
            layout: "grid",
          },
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "address",
      type: "string",
    }),
    defineField({
      name: "handle",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Header" };
    },
  },
});
