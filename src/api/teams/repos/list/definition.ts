export const listTeamRepos = {
  name: "list_team_repos",
  description: "List team repositories",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "id of the team",
      },
    },
  },
  required: ["username"],
};
