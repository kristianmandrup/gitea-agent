export const checkTeam = {
  name: "check_team",
  description: "Check if a team is assigned to a repository",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the team",
      },
    },
  },
  required: [],
};
