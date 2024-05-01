export const createWikiPage = {
  name: "create_wiki_page",
  description: "Creates a wiki page in a repository",
  parameters: {
    type: "object",
    properties: {
      contentBase64: {
        type: "string",
        description: "Content of the page must be base64 encoded",
      },
      title: {
        type: "string",
        description: "Page title. leave empty to keep unchanged",
      },
      commitMessage: {
        type: "string",
        description: "Optional commit message summarizing the change",
      },
    },
  },
  required: [],
};
