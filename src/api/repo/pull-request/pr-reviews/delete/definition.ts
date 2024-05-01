export const deletePullRequestReview = {
  name: "delete_pull_request_review",
  description: "Deletes an existing pull request review in the repository",
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
