export const addIssueComment = {
  name: "add_issue_comment",
  description: "Add a comment to an issue for a repository",
  parameters: {
    type: "object",
    properties: {
      body: {
        type: "string",
        description: "Body text of the comment",
      },
      id: {
        type: "string",
        description: "Unique identifier of the issue",
      },
    },
  },
  required: ["body"],
};
