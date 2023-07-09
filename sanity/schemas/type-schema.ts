import { defineType } from "sanity";
import ExternalLinkRenderer from "./components/ExternalLinkRenderer";

const type_content = defineType({
  name: "type_content",
  type: "array",
  title: "Content",
  of: [
    {
      type: "block",
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "link",
            fields: [
              {
                name: "url",
                type: "url",
              },
            ],
            components: {
              annotation: ExternalLinkRenderer,
            },
          },
        ],
      },
    },
    // this is our first custom block which will make it possible to add block images with alt text fields into your portable text
    {
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
        },
      ],
    },
  ],
});

export { type_content };
