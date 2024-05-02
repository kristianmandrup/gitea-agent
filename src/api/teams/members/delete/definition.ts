export const deleteTeamMember = {
  name: "delete_team_member",
  description: "Delete a team member",
  parameters: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "username of the team member",
      },
    },
  },
  required: ["username"],
};
