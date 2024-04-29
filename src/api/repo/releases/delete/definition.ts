export const deleteRelease = {
  name: "delete_release",
  description: "Deletes a release with a given name in a repository",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the release",
      },
    },
  },
  required: ["name"],
};
