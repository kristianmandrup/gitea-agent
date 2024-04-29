export const addCollaborator = {
  name: "add_collaborator",
  description: "Adds a collaborator with a given name to the repository",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the collaborator",
      },
    },
  },
  required: ["name"],
};
