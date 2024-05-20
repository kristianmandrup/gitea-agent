export const createPublicKey = {
  name: "create_public_key",
  description: "Creates a public key",
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
