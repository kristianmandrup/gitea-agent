# Pull Request agent using Gitea - self-hosted Git

See [Gitea](https://github.com/go-gitea/gitea)

## Design

The various controllers are all exported from the main `index.ts` file in the `src` folder.

The `GiteaMainController` is the `main` controller that acts as a hub for all the other primary controllers

- `admin`
- `orgs`
- `repo`
- `teams`
- `users`

```ts
const main = new GiteaMainController();
main.orgs
  .createOrganization
  // ...
  ();
main.admin
  .createUser
  // ...
  ();
// ...

main.addRepoController('myaccount', 'myreponame')
main.repos[]
```

The `repo` folder contains most of the key concepts to work with repositories, including:

- `commits`
- `branches`
- `issues`
- `teams`
- `collaborators`
- `pullRequests`
- `topics`

`issues` include

- `milestones`

`pullRequests` include:

- `reviews`

## Gitea API

This library is using [gitea-js](https://www.npmjs.com/package/gitea-js) as a wrapper to work with the Gitea REST API.

```ts
import { giteaApi } from "gitea-js";
import fetch from "cross-fetch";

const api = giteaApi("https://try.gitea.com/", {
  token: "access-token", // generate one at https://gitea.example.com/user/settings/applications
  customFetch: fetch,
});

const repo = api.repos.repoGet("anbraten", "gitea-js");
console.log(repo);
```

## AI Actions/Tools

The main infrastructure for actions has been implemented and a sample is available for repo branches in the form of:

- action definitions
- action handlers

A main `ActionHandler` for branches functionality is available with an `ActionHandlerRegistry` as `handlerRegistry: ActionHandlerRegistry` that is initialized with these action handlers.

Each `ActionHandler` has an async `handle(action: Action)` method which takes an action, looks up a matching handler in the registry. If a handler is found, it calls the `handle(action)` method of that handle to handle it. The handler will have access to the main gitea controller that exposes the relevant Gitea API as methods that can be executed with the arguments of the action.

The main `ActionHandler` for branches has not yet been integrated with the `GiteaMainController` however.
