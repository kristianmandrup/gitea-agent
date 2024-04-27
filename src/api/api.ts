const accessToken = process.env.GITEA_ACCESS_TOKEN;
const apiUrl = process.env.GITEA_URL || "https://try.gitea.com/";

// Set up axios instance with authentication headers
import { Api, giteaApi } from "gitea-js";
import fetch from "cross-fetch";

export class GiteaApi {
  api: Api<unknown>;

  constructor() {
    this.api = giteaApi(apiUrl, {
      token: accessToken, // generate one at https://gitea.example.com/user/settings/applications
      customFetch: fetch,
    });
  }
}

export const api = new GiteaApi();

export class GiteaApiAccessor {
  gitea: GiteaApi;

  constructor() {
    this.gitea = api;
  }

  protected get api() {
    return this.gitea.api;
  }
}
