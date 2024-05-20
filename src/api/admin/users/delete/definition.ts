export const deleteUser = {
  name: "delete_user",
  description: "Deletes a user with a given name in a repository",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the user to delete",
      },
    },
  },
  required: ["name"],
};
