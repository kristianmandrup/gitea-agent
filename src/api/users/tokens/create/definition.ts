export const createUserAccessToken = {
  name: "create_user_access_token",
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
        description: "name of the access token",
      },
      scopes: {
        type: "array",
        items: {
          type: "string",
          description: "scope for token",
        },
        description: "list of scopes for token, ie. what it can be used for",
      },
    },
  },
  required: ["username", "name"],
};
