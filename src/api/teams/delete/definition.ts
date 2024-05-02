export const deleteTeam = {
  name: "delete_team",
  description: "Delete a team",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Id of the team",
      },
    },
  },
  required: ["name"],
};
