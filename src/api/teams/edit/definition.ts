export const editTeam = {
  name: "edit_team",
  description: "Edit a team",
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
        description: "Permissions of the team",
      },
    },
  },
  required: ["name"],
};
