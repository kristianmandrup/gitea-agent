export const getRelease = {
  name: "get_release",
  description: "Gets information about a release of a repository by name",
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
