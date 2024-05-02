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

The `GiteaMainController` is the `main` controller that acts as a hub for all the other primary controllers

- `admin` done
- `orgs` partly done
- `repo` mostly done
- `teams` partly done
- `users` todo

The `repo` controller contains the following

- `commits` - done
- `branches` - done
- `teams` - done
- `milestones` - done
- `pullRequests` - done
- `issues` - partly done
- `collaborators` done
- `topics` todo

The `pullRequests` controller includes:

- `reviews` reviews for a given PR - partly done

The `reviews` controller includes:

- `comments` comment actions on reviews

## Quick start

Sample code to get going:

```ts
const main = new GiteaMainController();
main.orgs.create("my-org");
main.admin.users.create("my-name");
// ...

main.addRepoController("myaccount", "myreponame");
```

## Gitea API

This library is using [gitea-js](https://www.npmjs.com/package/gitea-js) as a wrapper to work with the Gitea REST API.

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

As a result of executing an action, the controller or action handler can notify the result of the action via the registered `notifier`. A sample `RepoNotifier` is made available, which notifies an `AIAdapter`, such as the `OpenAIAdapter` which communicats the notification to an OpenAI model via the OpenAI API.

## Handling AI responses

The notifier can be set up to received AI responses to the notification, which may include new actions to be handled by the Gitea main controller.

The `OpenAIAdapter` includes support for HTTP Request/Response, whereas `OpenAIStreamAdapter` works with the OpenAI streaming API, which streams response via SSE events, that are processed and each sent to be handled by the controller as they are received.
