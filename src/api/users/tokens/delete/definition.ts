export const deleteUserAccessToken = {
  name: "delete_user_access_token",
  description: "Create user access token",
  parameters: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "username of the user",
      },
      tokenName: {
        type: "string",
        description: "token name",
      },
    },
  },
  required: [],
};
