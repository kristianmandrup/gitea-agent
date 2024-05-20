export const deletePublicKey = {
  name: "delete_public_key",
  description: "Deletes a public key",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the organization",
      },
    },
  },
  required: ["name"],
};
