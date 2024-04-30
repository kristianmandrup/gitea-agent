export const isPullRequestMerged = {
  name: "is_pull_request_merged",
  description: "Check if a pull request has been merged",
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
