import { CreateUserOption, User } from "gitea-js";
import { IMainController } from "../../main";
import { GiteaMainAccessor } from "../../main-accesser";

export interface IGiteaAdminUserController {
  createUser(opts: CreateUserOption): Promise<User>;
  deleteUser(username: string, purge?: boolean): Promise<User>;
}

export class GiteaAdminUserController
  extends GiteaMainAccessor
  implements IGiteaAdminUserController
{
  $api = this.api.admin;
  baseLabel = "admin:users";

  constructor(main: IMainController) {
    super(main);
  }

  async createUser(opts: CreateUserOption) {
    const label = this.labelFor("create");
    const data = { ...opts };
    try {
      const response = await this.api.admin.adminCreateUser(opts);
      return await this.notifyAndReturn<User>(
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

  async deleteUser(username: string, purge?: boolean) {
    const label = this.labelFor("delete");
    const data = { username, purge };
    try {
      const response = await this.api.admin.adminDeleteUser(username, {
        purge,
      });
      return await this.notifyAndReturn<User>(
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
