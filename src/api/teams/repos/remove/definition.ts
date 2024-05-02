export const removeTeamRepo = {
  name: "remove_team_repo",
  description: "Remove a team repo",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "id of the team",
      },
      repo: {
        type: "number",
        description: "name of the repository",
      },
      org: {
        type: "string",
        description: "name of the organization",
      },
    },
  },
  required: ["username"],
};
