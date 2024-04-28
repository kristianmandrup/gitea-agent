export const createBranch = {
  name: "create_branch",
  description: "Creates a branch with a given name in a repository",
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
