export const createPullRequestReview = {
  name: "create_pull_request_review",
  description: "Creates a review for pull request in a repository",
  parameters: {
    type: "object",
    properties: {
      comments: {
        type: "array",
        items: {
          type: "string",
          description: "Comment",
        },
        description: "List of review comments",
      },
      body: {
        type: "string",
        description: "Body text of the PR",
      },
      commitId: {
        type: "string",
        description: "Commit id of the review",
      },
    },
  },
  required: ["body"],
};
