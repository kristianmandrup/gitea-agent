export const getFileInfo = {
  name: "get_file_info",
  description: "Gets information about a file in the repository",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Identifier of the file",
      },
    },
  },
  required: ["name"],
};
