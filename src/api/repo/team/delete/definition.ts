export const deleteTeam = {
  name: "delete_team",
  description: "Deletes a team with a given name for a repository",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the team",
      },
    },
  },
  required: ["name"],
};
