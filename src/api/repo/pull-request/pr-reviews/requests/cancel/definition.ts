export const createReviewRequests = {
  name: "cancel_review_requests",
  description: "Cancel review requests for a PR",
  parameters: {
    type: "object",
    properties: {
      pullRequestId: {
        type: "string",
        description: "Pull request identifier",
      },
      reviewers: {
        type: "array",
        items: {
          type: "string",
          description: "Comment",
        },
        description: "List of review comments",
      },
      teamReviewers: {
        type: "array",
        items: {
          type: "string",
          description: "Comment",
        },
        description: "List of review comments",
      },
    },
  },
  required: [],
};
