export const getOrganization = {
  name: "get_organization",
  description: "Gets an organization by name",
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
