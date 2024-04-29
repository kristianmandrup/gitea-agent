export const createRelease = {
  name: "create_release",
  description: "Creates a release with a given name for a repository",
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
