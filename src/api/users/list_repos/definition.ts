export const listUserRepos = {
  name: "list_user_repos",
  description: "List repos for a user",
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
