export const getReviewComments = {
  name: "get_review_comments",
  description: "Creates review requests for a pull request in a repository",
  parameters: {
    type: "object",
    properties: {
      pullRequestId: {
        type: "string",
        description: "Pull Request identifier",
      },
    },
  },
  required: [],
};
