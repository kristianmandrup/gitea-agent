export const changeFile = {
  name: "change_file",
  description: "Creates a file in the repository",
  parameters: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Commit message for files changed",
      },
      branch: {
        type: "string",
        description: "Branch name to create file changes in",
      },
      author: {
        type: "string",
        description: "Author of the file changes",
      },
      files: {
        type: "object",
        description: "File changes to be applied",
        properties: {
          content: {
            type: "string",
            description: "File content",
          },
          from_path: {
            type: "string",
            description: "Old path of the file to move",
          },
          operation: {
            type: "string",
            description:
              "The file operation to make, either: create, update or delete",
          },
          path: {
            type: "string",
            description: "File path",
          },
          sha: {
            type: "string",
            description:
              "SHA for the file that already exists, required for update or delete",
          },
        },
        required: ["path"],
      },
    },
  },
  required: ["files"],
};
