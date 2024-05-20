# Gitea agent framework

This library contains wrappers for the Gitea API that exposes each API call as an action, with a dedicated action handler. This in turn makes it easy to integrate with AI models, so that the AI model can be taught the available actions, and can execute these actions and be notified of the results of each action. This allows the AI model to interact with Gitea to achieve objectives as needed.

See [Gitea](https://github.com/go-gitea/gitea)

- [Design](#design)
- [Quick start](#quick-start)
- [Gitea API](#gitea-api)
- [Actions and handlers](#actions-and-action-handlers)
- [Action definitions](#action-definitions)
- [Registering actions as tools/functions](#registering-toolsfunctions)
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

The Gitea API methods are (and should be) wrapped in controllers such as `GiteaRepoIssueCommentController`, with methods like the following `create` used to create a branch given a `branchName`.

The method `coreData` should be implemented for each controller to return the core data (state) of the controller, such as `owner` and `repoName` for any controller working on a repo.

The `$api` should be set for convenience and to make it clear what Gitea `api` scope the controller methods should be using.

```ts
export class GiteaBranchController
  extends RepoBaseController
  implements IBranchController
{
  baseLabel = "repo:branch";

  async create(branchName: string) {
    const label = this.labelFor("create");
    const data = { branchName };
    try {
      const response = await this.$api.repoCreateBranch(
        this.owner,
        this.repoName,
        {
          new_branch_name: branchName,
        }
      );
      return await this.notifyAndReturn<Branch>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  // more methods
}
```

You can also include a default value `returnVal` to be returned in case of an error. This is demonstrated in the following `createProtection` method below:

```ts
  async createProtection(
    branchName: string,
    opts?: CreateBranchProtectionOption
  ) {
    const label = this.labelFor("protection:create");
    const fullOpts = {
      ...(opts || {}),
      branch_name: branchName,
    };
    const data = fullOpts;
    const returnVal: any[] = [];
    try {
      const response = await this.api.repos.repoCreateBranchProtection(
        this.owner,
        this.repoName,
        fullOpts
      );
      return await this.notifyAndReturn<BranchProtection>(
        { label, returnVal, response },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, returnVal, error }, data);
    }
  }
```

Each such wrapper method should wrap the call in a `try/catch` to ensure both HTTP errors and any other errors are handled without throwing an error.

For any controller, the `setShouldThrow(true)` method can be used to force methods to throw an error if needed.

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

The `BranchActionHandler` for branches has been registered with the `RepoActionHandler` which has in turn been registered with the root `MainActionHandler` for the main controller.

```
main_action_handler:
  repo_action_handler:
    branch_action_handler:
      - create
      - delete
      - ...
```

An individual leaf action handler such as `CreateBranchActionHandler` may look as follows

````ts
export class CreateBranchActionHandler extends LeafActionHandler {
  name = "create_branch";

  async handle(action: Action) {
    // the incoming action is validated in terms of conformity to the action definition schema
    if (!this.validate(action)) return;
    // name parameter is extracted
    const { name } = action.parameters;
    // calls Gitea API wrapper via the main controller, drilling down to the branch controller
    const data = await this.main.repos.branches.create(name);
    console.log({ data });
  }

  get definition(): any {
    return createBranch;
  }
}

The `GiteaMainController` exposes an async `handle` method which delegates the action to each of these handlers registered, recursively down the tree, until a matching `LeafActionHandler` is found which executes the action.

To register a handler:

```ts
const myTeamHandler = new MyTeamActionHandler(main);
main.registerHandler(myTeamHandler);
````

Remove handlers

```ts
main.removeHandler(myTeamHandler);
main.removeHandlerByName('my_other_handler);
```

When handlers are registered, the action definitions of those handlers will be available as the `definitions` property on the composite handler and on the main controller.

## Action definitions

Each action definition is a JSON schema that defines the name of the actions and the available and required parameters that can be used for that action.

```ts
main.definitions; // => [
// {
// name: "create_branch", properties: {...} }
// ]
```

A full action definition may look as follows:

```ts
export const createBranch = {
  name: "create_branch",
  description: "Creates a branch with a given name in a repository",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the branch",
      },
    },
  },
  required: ["name"],
};
```

The definitions can be used to communicate available actions to an AI agent so it knows how to execute those actions by sending a JSON response conforming to the action definition.

An AI action response for the above action definition may look as follows for `choices[0].message.tools_call[0]`:

```json
{
  "name": "create_branch",
  "arguments": {
    "name": "my-branch"
  }
}
```

## AI notifications

As a result of executing an action, the controller or action handler can notify the result of the action via the registered `notifier`. A sample `RepoNotifier` is made available, which has a method `notify` that notifies an `AIAdapter`, such as the `OpenAIAdapter`.
This lets the gitea agent communicate the notification to an OpenAI model via the OpenAI API.
The same goes for errors, using `notifyError` to notify the AI about any action error.

The following is from the `MainNotifier`, accessible via the `GiteaMainController`

```ts
  async notifyError(label: string, data: any) {
    await this.notify(`ERROR:${label}`, data);
  }

  async notify(label: string, data: any) {
    const message = JSON.stringify(label, data);
    const aiResponse = await this.aiAdapter.notifyAi(message);
    this.handleResponse(aiResponse);
  }
```

The AI adapter is notified with the message and the AI response is attempted handled as an action via `handleResponse`.

## Handling AI responses

The notifier can be set up to received AI responses to the notification, which may include new actions to be handled by the Gitea main controller.

The `OpenAIAdapter` includes support for HTTP Request/Response, whereas `OpenAIStreamAdapter` works with the OpenAI streaming API, which streams response via SSE events, that are processed and each sent to be handled by the controller as they are received.

The following is from the `MainNotifier`, accessible via the `GiteaMainController`

```ts
  public handleResponse(message: ChatCompletionMessage) {
    try {
      this.handleMessage(message);
    } catch (error) {
      console.log("Not a gitea action");
    }
  }
```

The `handleResponse` method receives the AI response, get any actions in the response amd proceeds to handle each action by calling the main `handle` method which find the appropriate action handler to handle and execute the action.

You can setup `main` with a custom `notifier` targeting any AI model with suitable `AIAdapter` and `MessageHandler` implementations.

```ts
const aiAdapter = new MyAIAdapter();
const messageHandler = new MyMessageHandler(main);
main.notifier = new MainNotifier(main, { aiAdapter, messageHandler });
```

## Registering tools/functions

The following describes a recipe for registering the SDK as tools for use with ChatGPT.

Tools are registered by creating a list of `tools` from the action definitions with the following tool structure for each.

```ts
const tools = [
  {
    type: "function",
    function: {
      name: "create_branch",
      description: "Creates a branch with a given name in a repository",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the branch",
          },
        },
      },
      required: ["name"],
    },
  },
];
```

These are then registered with the AI, such as OpenAI, using the relevant adapter, such as:

```ts
const aiAdapter = new OpenAIAdapter();
aiAdapter.setTools(tools);
```

Alternatively use `addTool(definition)` or `addTools(definitions)`

```ts
aiAdapter.addTool(definitions.createBranch);
```

For the sample `OpenAIAdapter` the tools are registered internally via the async `getAIResponse` method as follows

```ts
  async getAIResponse() {
    return await this.client.createChatCompletion({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: this.messages,
      tools: this.tools,
      tool_choice: "auto",
    });
  }
```
