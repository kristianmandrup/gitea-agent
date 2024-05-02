export const getTeam = {
  name: "get_team",
  description: "Get a team for an organization",
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
