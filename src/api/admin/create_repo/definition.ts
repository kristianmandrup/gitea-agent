export const createRepository = {
  name: "create_repository",
  description: "Creates a repository",
  parameters: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "Username of the user creating the repository",
      },
      name: {
        type: "string",
        description: "Name of the repository",
      },
      description: {
        type: "string",
        description: "Description of the repository",
      },
      private: {
        type: "boolean",
        description: "Whether the repository is private or not (public)",
      },
    },
  },
  required: ["name"],
};
