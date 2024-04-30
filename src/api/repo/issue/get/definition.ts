export const getIssue = {
  name: "get_issue",
  description: "Gets an issue for a repository",
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
