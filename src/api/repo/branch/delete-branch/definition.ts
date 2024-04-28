export const deleteBranch = {
  name: "delete_branch",
  description: "Deletes a branch with a given name in a repository",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the branch",
      },
    },
  },
  required: ["name"],
};
