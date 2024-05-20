export const addTeamRepo = {
  name: "add_team_repo",
  description: "Add team repository",
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
