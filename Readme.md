# Gitea agent framework

This library contains wrappers for the Gitea API that exposes each API call as an action, with a dedicated action handler. This in turn makes it easy to integrate with AI models, so that the AI model can be taught the available actions, and can execute these actions and be notified of the results of each action. This allows the AI model to interact with Gitea to achieve objectives as needed.

See [Gitea](https://github.com/go-gitea/gitea)

- [Design](#design)
- [Quick start](#quick-start)
- [Gitea API](#gitea-api)
- [Actions and handlers](#actions-and-action-handlers)
- [AI notifications](#ai-notifications)
- [Handling AI responses](#handling-ai-responses)

## Design

The various controllers are all exported from the main `index.ts` file in the `src` folder.

The `GiteaMainController` is the `main` controller that acts as a hub (and root) for all the other primary controllers

```yaml
- admin:
    - users
    - public_keys
- orgs:
    - members
    teams:
        - repos
- repo:
    - branches
    - collaborators
    - commits
    - files
    issues:
      - comments
    - teams
    - milestones
    - pullRequests:
        reviews:
          - comments
    - releases
    - wiki
    - topics (not done)
    - tags (not done)
- teams
  - members
  - repos
- users
  - tokens
```

Note: Project and Board API support will be coming when Gitea releases API support, likely in `1.23` coming up later in 2024.

## Quick start

Set Env variables for the Gitea api, including _access token_ and _gitea base url_.
These are used when creating the Gitea API client.

```ts
const accessToken = process.env.GITEA_ACCESS_TOKEN;
const apiUrl = process.env.GITEA_URL || "https://try.gitea.com/";
```

Now you can get going using the `GiteaMainController` as the starting point.

```ts
// create the main gitea root controller
const main = new GiteaMainController();
// create an organisation
main.orgs.create("my-org");
// create a user
main.admin.users.create("my-name");
// Create repo controller and make it the default active one for further API calls
main.addRepoController("myaccount", "myreponame", true);
// get the active repo controller
const $repos = main.repos;
// get repo details
const repo = $repos.get();
// get PR controller for repo
const $prc = $repos.pullRequests;
// get list of PRs for repo
const prs = prc.list();
// set the active PR index to use going forward
$prc.setIndex(1);
// get a PR using the default active index
const pr = $prc.get();
// create a new PR
const created = $prc.create({
  title: "my PR",
  body: "This PR ...",
  head: headSha,
});
// ... more
```

## Gitea API

This library is using [gitea-js](https://www.npmjs.com/package/gitea-js) as a wrapper to work with the Gitea REST API.

The Gitea API method are wrapped in controllers such as `GiteaRepoIssueCommentController`, with methods like the following `getComments`:

```ts
async getComments(index = this.index) {
  if (!index) {
    throw new Error("Missing issue index");
  }
  const label = "issue:comments:get";
  try {
    const response = await this.api.repos.issueGetComments(
      this.owner,
      this.repoName,
      index
    );
    const comments = response.data;
    const notification = {
      ...this.repoData,
      index,
      comments,
    };
    await this.notify(label, notification);
    return comments;
  } catch (error) {
    const notification = {
      ...this.repoData,
      index,
      error,
    };
    await this.notifyError(label, notification);
    return [];
  }
}
```

Each such wrapper method should wrap the call in a `try/catch`. On a successful API call, it should call `notify` with success details. On error, it should call `notifyError` with error details.
Any notification should be sent to the relevant AI/user agents to act upon.

## Actions and Action handlers

The main infrastructure for actions has been implemented and a sample is available for repo branches in the form of:

- action definitions
- action handlers

A main `ActionHandler` for branches functionality is available with an `ActionHandlerRegistry` as `handlerRegistry: ActionHandlerRegistry` that is initialized with these action handlers.

Each `IActionHandler` has an async `handle(action: Action)` method which takes an action, looks up a matching handler in the registry. If a handler is found, it calls the `handle(action)` method of that handle to handle it. The handler will have access to the main gitea controller that exposes the relevant Gitea API as methods that can be executed with the arguments of the action.

There are two types of implementations of `IActionHandler`:

- `LeafActionHandler` for a leaf node which handles and executes an action
- `CompositeActionHandler` which contains registries of leaf and composite handlers

Using composites, a tree hierarchy of `IActionHandler`s can easily be configured.

The `BranchActionHandler` for branches has registered with the `RepoActionHandler` which has in turn been registered with the root `MainActionHandler` for the main controller.

The `GiteaMainController` exposes an async `handle` method which delegates the action to each of these handlers registered, recursively down the tree, until a matching `LeafActionHandler` is found which executes the action.

To register a handler:

```ts
const myTeamHandler = new MyTeamActionHandler(main);
main.registerHandler(myTeamHandler);
```

Remove handlers

```ts
main.removeHandler(myTeamHandler);
main.removeHandlerByName('my_other_handler);
```

When handlers are registered, the action definitions of those handlers will be available as the `definitions` property on the composite handler and on the main controller.

Each action definition is a JSON schema that defines the name of the actions and the available and required parameters that can be used for that action.

```ts
main.definitions; // => [
// { name: "create_branch", properties: {...} }
// ]
```

The definitions can be used to communicate available actions to an AI agent so it knows how to execute those actions by sending a JSON response conforming to the action definition.

## AI notifications

As a result of executing an action, the controller or action handler can notify the result of the action via the registered `notifier`. A sample `RepoNotifier` is made available, which has a method `notify` that notifies an `AIAdapter`, such as the `OpenAIAdapter`.
This lets the gitea agent communicate the notification to an OpenAI model via the OpenAI API.
The same goes for errors, using `notifyError` to notify the AI about any action error.

```ts
  async notifyError(label: string, data: any) {
    await this.notify(`ERROR:${label}`, data);
  }

  async notify(label: string, data: any) {
    const message = JSON.stringify(label, data);
    const aiResponses = await this.aiAdapter.notifyAi(message);
    for (const response of aiResponses) {
      this.handleResponse(response);
    }
  }
```

## Handling AI responses

The notifier can be set up to received AI responses to the notification, which may include new actions to be handled by the Gitea main controller.

The `OpenAIAdapter` includes support for HTTP Request/Response, whereas `OpenAIStreamAdapter` works with the OpenAI streaming API, which streams response via SSE events, that are processed and each sent to be handled by the controller as they are received.

```ts
  handleAction(action: any) {
    if (!this.isGiteaAction(action)) return;
    this.main.handle(action);
  }

  handleResponse(aiResponse: string) {
    try {
      const action = JSON.parse(aiResponse);
      this.handleAction(action);
    } catch (error) {
      console.log("Not a gitea action");
    }
  }
```
