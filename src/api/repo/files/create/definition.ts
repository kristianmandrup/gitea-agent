export const createFile = {
  name: "create_file",
  description: "Creates a file in the repository",
  parameters: {
    type: "object",
    properties: {
      filepath: {
        type: "string",
        description: "File path",
      },
      content: {
        type: "string",
        description: "File content",
      },
      message: {
        type: "string",
        description: "Commit message for file",
      },
      branch: {
        type: "string",
        description: "Branch name to create file in",
      },
      author: {
        type: "string",
        description: "Author of the file",
      },
    },
  },
  required: ["name"],
};
