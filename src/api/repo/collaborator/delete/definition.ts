export const deleteCollaborator = {
  name: "delete_collaborator",
  description: "Deletes a collaborator with a given name for a repository",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the collaborator",
      },
    },
  },
  required: [],
};
