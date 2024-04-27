import { AccessToken, CreateAccessTokenOption } from "gitea-js";
import { GiteaApiAccessor } from "../api";
import { GiteaMainController, IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";

export interface IUserController {
  createUserToken(
    username: string,
    opts: CreateAccessTokenOption
  ): Promise<AccessToken>;
}

export class GiteaUserController
  extends GiteaMainAccessor
  implements IUserController
{
  async createUserToken(username: string, opts: CreateAccessTokenOption) {
    const response = await this.api.users.userCreateToken(username, opts);
    return response.data;
  }
}
