import { AccessToken, CreateAccessTokenOption } from "gitea-js";
import { GiteaMainAccessor } from "../../main-accesser";

export interface IUserTokenController {
  create(username: string, opts: CreateAccessTokenOption): Promise<AccessToken>;
  delete(username: string, token: string): Promise<void>;
}

export class GiteaUserTokenController
  extends GiteaMainAccessor
  implements IUserTokenController
{
  async create(username: string, opts: CreateAccessTokenOption) {
    const response = await this.api.users.userCreateToken(username, opts);
    return response.data;
  }

  async delete(username: string, token: string) {
    const response = await this.api.users.userDeleteAccessToken(
      username,
      token
    );
    return response.data;
  }
}
