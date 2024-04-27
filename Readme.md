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

- `branches`
- `issues`
- `teams`
- `collaborators`
- `pullRequests`
- `topics`

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
