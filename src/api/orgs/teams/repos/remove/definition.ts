export const removeTeamRepo = {
  name: "remove_team_repo",
  description: "Remove team repository",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "team id",
      },
      repo: {
        type: "string",
        description: "repository name",
      },
    },
  },
  required: ["id", "repo"],
};
