import { AccessToken, CreateAccessTokenOption } from "gitea-js";
import { GiteaApiAccessor } from "../api";
import { GiteaMainController, IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";

export interface IUserController {}

export class GiteaUserController
  extends GiteaMainAccessor
  implements IUserController
{
  async listKeys(username: string) {
    const response = await this.api.users.userListKeys(username);
    return response.data;
  }

  async listRepos(username: string) {
    const response = await this.api.users.userListRepos(username);
    return response.data;
  }

  async getByName(username: string) {
    const response = await this.api.users.userGet(username);
    return response.data;
  }
}
