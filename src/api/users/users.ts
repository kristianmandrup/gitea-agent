import { CreateAccessTokenOption } from "gitea-js";
import { GiteaApiAccesser } from "../api";

export class GiteaUserController extends GiteaApiAccesser {
  constructor() {
    super();
  }

  async createUserToken(username: string, opts: CreateAccessTokenOption) {
    const response = await this.api.users.userCreateToken(username, opts);
    return response.data;
  }
}
