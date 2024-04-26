# Pull Request agent using Gitea - self-hosted Git

See [Gitea](https://github.com/go-gitea/gitea)

## Gitea API

This library will use [gitea-js](https://www.npmjs.com/package/gitea-js) to work with the Gitea REST API.

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
