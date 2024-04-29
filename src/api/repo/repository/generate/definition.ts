export const generateFromTemplate = {
  name: "generate_from_template",
  description: "Generates a new repository based on a template repository",
  parameters: {
    type: "object",
    properties: {
      templateOwner: {
        type: "string",
        description:
          "The name of the owner of the repository to use as a template",
      },
      templateName: {
        type: "string",
        description: "The name of the repository to use as a template",
      },
      newName: {
        type: "string",
        description:
          "The name of the new repository to create from the template",
      },
    },
  },
  required: ["template"],
};
