export const checkIsMember = {
  name: "check_is_member",
  description: "Check if a user is a member of an organization",
  parameters: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "username of the user",
      },
    },
  },
  required: ["username"],
};
