export const setPullRequestId = {
  name: "set_pull_request_id",
  description: "Sets default pull request id for reviews controller",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "Identifier of the Pull Request",
      },
    },
  },
  required: ["id"],
};
