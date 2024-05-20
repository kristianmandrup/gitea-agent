import { CreateKeyOption, PublicKey } from "gitea-js";
import { GiteaMainAccessor } from "../../main-accesser";

export interface IGiteaAdminPublicKeyController {
  deleteUserPublicKey(username: string, id: number): Promise<any>;
  createUserPublicKey(
    username: string,
    key: CreateKeyOption
  ): Promise<PublicKey>;
}

export class GiteaAdminPublicKeyController
  extends GiteaMainAccessor
  implements IGiteaAdminPublicKeyController
{
  $api = this.api.admin;
  baseLabel = "admin:keys:public";

  async deleteUserPublicKey(username: string, id: number) {
    const label = this.labelFor("delete");
    const data = { username, id };
    try {
      const response = await this.api.admin.adminDeleteUserPublicKey(
        username,
        id
      );
      return await this.notifyAndReturn<any>(
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
  async createUserPublicKey(username: string, key: CreateKeyOption) {
    const label = this.labelFor("create");
    const data = { username, key };
    try {
      const response = await this.api.admin.adminCreatePublicKey(username, key);
      return await this.notifyAndReturn<PublicKey>(
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
}
