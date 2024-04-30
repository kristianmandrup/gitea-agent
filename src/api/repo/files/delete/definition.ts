export const deleteFile = {
  name: "delete_file",
  description: "Deletes a file in the repository",
  parameters: {
    type: "object",
    properties: {
      filepath: {
        type: "string",
        description: "File path",
      },
      sha: {
        type: "string",
        description: "SHA for the file that already exists",
      },
    },
    required: ["filepath"],
  },
};
