export const mergePullRequest = {
  name: "merge_pull_request",
  description: "Merges an existing pull request in the repository",
  parameters: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "Number of the PR acting as the PR identifier",
      },
      mergeType: {
        type: "string",
        description: "Type of merge, either: merge or rebase",
      },
    },
  },
  required: [],
};
