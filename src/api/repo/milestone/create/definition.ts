export const createMilestone = {
  name: "create_milestone",
  description: "Creates a milestone for a repository",
  parameters: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "Title of the milestone",
      },
      description: {
        type: "string",
        description: "Description of the milestone",
      },
      dueDate: {
        type: "string",
        description: "Date when the milestone is due",
      },
    },
  },
  required: ["title"],
};
