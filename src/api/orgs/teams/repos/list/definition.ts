export const listTeamRepositories = {
  name: "list_team_repositories",
  description: "List repositories for a team",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "team id",
      },
    },
  },
  required: ["id"],
};
