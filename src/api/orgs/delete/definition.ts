export const deleteOrganization = {
  name: "delete_organization",
  description: "Deletes a organization with a given name in a repository",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the organization to delete",
      },
    },
  },
  required: ["name"],
};
