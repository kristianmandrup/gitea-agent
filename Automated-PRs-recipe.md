To make your AI agent authenticate with Gitea and perform automated pull request reviews, you'll need to follow these general steps:

- **Generate API Access Token**: Create an API access token in your Gitea account settings. This token will be used by your AI agent to authenticate with Gitea's API.
- **Authenticate Requests**: Include the API access token in the HTTP headers of your requests to Gitea's API. Most HTTP client libraries allow you to set custom headers, so you can add an Authorization header with a value of token <your-access-token>.
- **Pull Request Retrieval**: Use Gitea's API to retrieve a list of pull requests that need to be reviewed. You can filter pull requests based on criteria such as repository, status, labels, etc.
- **Pull Request Review**: For each pull request, analyze the changes, perform the desired review actions, and submit comments or make review decisions programmatically based on your AI algorithms.
- **Automated Actions**: Depending on your use case, you may want to perform automated actions such as approving or merging pull requests, closing or reopening pull requests, assigning reviewers, etc.

## Creating PRs with Agit flow

A PR agent for Gitea should leverage the [Agit-Flow](https://git-repo.info/en/2020/03/agit-flow-and-git-repo/) in order to greatly simplify the Git PR mechanics.

Agit allows the PRs to be made directly on the main branch instead of requiring PRs from feature branches.

This flow is perfect for a fast-paced "startup environment" which is akin to an agent workflow.

Agit allows to create PRs while pushing code to the remote repo. This can be done by pushing to the branch followed by a specific refspec (a location identifier known to git). The following example illustrates this:

`git push origin HEAD:refs/for/main`

The command has the following structure:

- `HEAD` The target branch
- `refs/<for|draft|for-review>/<branch>:` The target PR type
- `for` Create a normal PR with <branch> as the target branch
- `draft/ for-review` Currently ignored silently
- `<branch>/<session>` The target branch to open the PR
- `-o <topic|title|description>` Options for the PR
- `title` The PR title
  `topic` The branch name the PR should be opened for
- `description` The PR description
- `force-push` confirm force update the target branch

Here's another advanced example for creating a new PR targeting main with topic, title, and
description:

```bash
git push origin HEAD:refs/for/main -o topic="Topic of my PR" -o title="Title of the PR" -o description="# The PR Description\nThis can be **any** markdown content.\n- [x] Ok"
```

## The Agit workflow

The agit workflow is a Git workflow that is specifically designed to work with the Gitea platform. It focuses on simplifying the process of managing branches and pull requests in a way that is optimized for collaboration and code review.

Here are the main principles of the agit workflow:

- **Feature Branches**: Developers work on new features or bug fixes in separate branches. These branches are typically named descriptively to indicate the purpose of the changes.
- **Pull Requests**: When a developer completes work on a feature or bug fix, they create a pull request to merge their branch into the main branch (often master or main). Pull requests include a description of the changes, as well as any necessary documentation or tests.
- **Code Review**: Pull requests undergo code review by other members of the team. Reviewers provide feedback on the code, suggest improvements, and ensure that it meets the project's standards and requirements.
- **Continuous Integration (CI)**: Pull requests are automatically tested using continuous integration tools. This ensures that the changes integrate smoothly with the existing codebase and don't introduce any regressions or errors.
- **Merge Strategy**: Once a pull request has been approved and all tests pass, it can be merged into the main branch. The agit workflow typically uses a "squash and merge" or "rebase and merge" strategy to keep the commit history clean and linear.
- **Issue Tracking Integration**: The agit workflow often integrates with issue tracking systems to link pull requests to specific tasks or issues. This helps maintain context and traceability throughout the development process.

Overall, the agit workflow is designed to streamline collaboration, improve code quality, and facilitate efficient code review and deployment processes within the Gitea platform.

## PR Review recipe

In the sample implementation:

- We define the `PullRequest` interface to represent the structure of a pull request, including its title and the files changed.
- The `ReviewSuggestion` interface represents a review suggestion, including the file being reviewed and a comment.
- The `generateReviewSuggestions` function simulates the behavior of an AI service by generating review suggestions for each file changed in the pull request.
- The `applyReviewSuggestions` function applies the review suggestions (in this case, simply logging them to the console).
- The `reviewPullRequests` function iterates through an array of pull requests, generates review suggestions for each one, and applies them.

This is a simplified example, but it demonstrates the basic workflow of generating and applying review suggestions using an external AI agent service. You can extend this implementation to include more sophisticated review logic and integrate with a real AI service as needed.

## Pull request API

[Get a pull request](https://docs.gitea.com/api/1.20/#tag/repository/operation/repoListPinnedPullRequests)

- [Get single PR](https://gitea.com/api/v1/repos/{owner}/{repo}/pulls/{index})
- [Get PR Reviews](https://docs.gitea.com/api/1.20/#tag/repository/operation)repoDeletePullReviewRequests`
- [Get specific review](https://docs.gitea.com/api/1.20/#tag/repository/operation/repoDeletePullReview)
- [Get changed files for a PR](https://docs.gitea.com/api/1.20/#tag/repository/operation/repoGetPullRequestCommits)
- [Get a PR diff](https://docs.gitea.com/api/1.20/#tag/repository/operation/repoEditPullRequest)
- [Get commits for a pull request](https://docs.gitea.com/api/1.20/#tag/repository/operation/repoDownloadPullDiffOrPatch)
- [List all PR reviews](https://docs.gitea.com/api/1.20/#tag/repository/operation/repoDeletePullReviewRequests)
- [Merge a PR](https://docs.gitea.com/api/1.20/#tag/repository/operation/repoMergePullRequest)
- [Create PR review requests](https://docs.gitea.com/api/1.20/#tag/repository/operation/repoCreatePullReviewRequests)
