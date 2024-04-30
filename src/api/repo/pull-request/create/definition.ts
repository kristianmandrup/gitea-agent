export const createPullRequest = {
  name: "create_pull_request",
  description: "Creates a pull request for a branch in the repository",
  parameters: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "Title of the PR",
      },
      body: {
        type: "string",
        description: "Body text of the PR",
      },
      assignees: {
        type: "array",
        items: {
          type: "string",
          description: "Username of an assignee",
        },
        description: "Usernames of assignees",
      },
    },
  },
  required: [],
};
