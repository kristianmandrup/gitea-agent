export const dismissPullRequestReview = {
  name: "dismiss_pr_review",
  description: "Dismiss pull request review",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "Identifier of the Pull Request",
      },
      message: {
        type: "string",
        description: "Dismiss message",
      },
      // priors: {
      //   type: "boolean",
      //   description: "",
      // },
    },
  },
  required: ["id"],
};
