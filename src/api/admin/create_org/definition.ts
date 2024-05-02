export const createOrg = {
  name: "create_organization",
  description: "Creates an organization",
  parameters: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "Username of the user creating the organization",
      },
      fullName: {
        type: "string",
        description: "Full name of the organization",
      },
      description: {
        type: "string",
        description: "Description of the organization",
      },
    },
  },
  required: ["fullName"],
};
