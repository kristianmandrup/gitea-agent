export const getPullRequest = {
  name: "get_pull_request",
  description: "Gets information about a pull request in the repository",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "Number of the PR acting as the PR identifier",
      },
    },
  },
  required: [],
};
