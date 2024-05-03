export const listCommits = {
  name: "list_commits",
  description: "List commits",
  parameters: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "filepath of a file/dir",
      },
      sha: {
        type: "string",
        description: "SHA of the commit or branch to start from",
      },
      stat: {
        type: "boolean",
        description: "Include stats",
      },
      files: {
        type: "boolean",
        description: "Include files",
      },
    },
  },
  required: [],
};
