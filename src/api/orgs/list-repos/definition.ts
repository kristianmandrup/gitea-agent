export const listOrganizationRepos = {
  name: "list_organization_repos",
  description: "List repos for an organization",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the organization",
      },
      limit: {
        type: "number",
        description: "Maximum number of results per page",
      },
    },
  },
  required: [],
};
