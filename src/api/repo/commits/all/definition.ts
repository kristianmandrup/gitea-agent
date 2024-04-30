export const getAll = {
  name: "get_commits",
  description: "Get all commits",
  parameters: {
    type: "object",
    properties: {
      filepath: {
        type: "string",
        description: "filepath of a file/dir",
      },
      sha: {
        type: "string",
        description: "SHA of the commit or branch to start from",
      },
    },
  },
  required: [],
};
