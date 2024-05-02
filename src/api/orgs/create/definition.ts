export const createOrganization = {
  name: "create_organization",
  description: "Creates an organization",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the organization",
      },
    },
  },
  required: ["name"],
};
