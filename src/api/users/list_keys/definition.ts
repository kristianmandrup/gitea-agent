export const listUserKeys = {
  name: "list_user_keys",
  description: "List keys for a user",
  parameters: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "username of the user",
      },
    },
  },
  required: [],
};
