export const listUserOrgs = {
  name: "list_user_organizations",
  description: "List organizations for a user",
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
