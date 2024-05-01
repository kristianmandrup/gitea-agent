export const getPullRequestReview = {
  name: "get_pull_request_review",
  description: "Gets a pull request review from a repository",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "Identifier of the Pull Request",
      },
      reviewId: {
        type: "number",
        description: "Identifier of the PR review",
      },
    },
  },
  required: ["reviewId"],
};
