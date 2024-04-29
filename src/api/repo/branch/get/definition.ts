export const getBranch = {
  name: "get_branch",
  description: "Gets information about a branch of a repository by name",
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
