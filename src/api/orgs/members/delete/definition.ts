export const deleteMember = {
  name: "delete_team",
  description: "Delete a member from an organization",
  parameters: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "username of the member",
      },
    },
  },
  required: ["username"],
};
