export const createTeam = {
  name: "create_team",
  description: "Creates a team for an organization",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the team",
      },
      description: {
        type: "string",
        description: "Description of the team",
      },
      permission: {
        type: "string",
        description: "Permissions for the team: read, write or admin",
      },
    },
  },
  required: ["name"],
};
