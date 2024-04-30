export const deleteMilestone = {
  name: "delete_milestone",
  description: "Deletes a milestone in a repository",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Unique identifier of the milestone",
      },
    },
  },
  required: ["id"],
};
