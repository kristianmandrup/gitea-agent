export const getWikiPage = {
  name: "get_wiki",
  description: "Gets a wiki from a repository",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "Identifier of the Pull Request",
      },
    },
  },
  required: ["reviewId"],
};
