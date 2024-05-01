export const deleteWikiPage = {
  name: "delete_wiki_page",
  description: "Deletes an existing wiki page in the repository",
  parameters: {
    type: "object",
    properties: {
      pageName: {
        type: "string",
        description: "Name of the page to delete",
      },
    },
  },
  required: ["pageName"],
};
