export const deletePullRequest = {
  name: "delete_pull_request",
  description: "Deletes an existing pull request in the repository",
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
