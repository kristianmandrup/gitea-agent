export const getMilestone = {
  name: "get_milestone",
  description: "Gets information about a milestone of a repository",
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
