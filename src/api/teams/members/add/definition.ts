export const addTeamMember = {
  name: "add_team_member",
  description: "Add a team member",
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
