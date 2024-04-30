export const createIssue = {
  name: "create_issue",
  description: "Creates an issue for a repository",
  parameters: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "Title of the issue",
      },
      body: {
        type: "string",
        description: "Body text of the issue",
      },
    },
  },
  required: ["title", "body"],
};
