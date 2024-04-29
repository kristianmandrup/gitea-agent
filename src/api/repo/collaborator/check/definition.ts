export const checkCollaborator = {
  name: "check_collaborator",
  description: "Checks information about a collaborator for a repository",
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
