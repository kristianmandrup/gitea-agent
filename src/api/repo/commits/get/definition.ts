export const getCommit = {
  name: "get_commit",
  description: "Get a single commit",
  parameters: {
    type: "object",
    properties: {
      sha: {
        type: "string",
        description: "SHA of the commit",
      },
    },
  },
  required: ["sha"],
};
