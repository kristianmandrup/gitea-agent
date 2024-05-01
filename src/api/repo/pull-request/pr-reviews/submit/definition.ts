export const submitPullRequestReview = {
  name: "submit_pr_review",
  description: "Submit pending pull request review",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "Identifier of the Pull Request",
      },
    },
  },
  required: ["id"],
};
