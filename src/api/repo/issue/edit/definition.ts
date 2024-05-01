export const editIssue = {
  name: "edit_issue",
  description: "Edits an issue for a repository",
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
      state: {
        type: "string",
        description: "State of the issue",
      },
    },
  },
  required: ["title", "body"],
};
