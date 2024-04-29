export const addTeam = {
  name: "add_team",
  description: "Adds a team with a given name for a repository",
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
