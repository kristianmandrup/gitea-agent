export const getIssueComments = {
  name: "get_issue_comments",
  description: "Get comments for an issue",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Unique identifier of the issue",
      },
    },
  },
  required: ["id"],
};
