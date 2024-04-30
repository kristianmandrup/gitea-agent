export const deleteIssue = {
  name: "delete_issue",
  description: "Deletes a issue in a repository",
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
