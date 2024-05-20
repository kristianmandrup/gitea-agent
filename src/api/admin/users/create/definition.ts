export const createUser = {
  name: "create_user",
  description: "Creates an user",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the user",
      },
    },
  },
  required: ["name"],
};
