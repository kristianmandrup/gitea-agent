import { Organization, PublicKey, Repository, User } from "gitea-js";
import { IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";
import {
  GiteaUserTokenController,
  IUserTokenController,
} from "./tokens/controller";

export interface IUserController {
  tokens: IUserTokenController;

  listKeys(username: string): Promise<PublicKey[]>;
  listRepos(username: string): Promise<Repository[]>;
  listOrgs(username: string): Promise<Organization[]>;
  getByName(username: string): Promise<User>;
}

export class GiteaUserController
  extends GiteaMainAccessor
  implements IUserController
{
  tokens: IUserTokenController;

  baseLabel = "users";

  constructor(main: IMainController) {
    super(main);
    this.tokens = this.createUserTokenController();
  }

  protected createUserTokenController() {
    return new GiteaUserTokenController(this.main);
  }

  async listKeys(username: string) {
    const label = this.labelFor("keys:list");
    const data = { username };
    try {
      const response = await this.api.users.userListKeys(username);
      return await this.notifyAndReturn<PublicKey[]>(
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

  async listRepos(username: string) {
    const label = this.labelFor("repos:list");
    const data = { username };
    try {
      const response = await this.api.users.userListRepos(username);
      return await this.notifyAndReturn<Repository[]>(
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

  async listOrgs(username: string) {
    const label = this.labelFor("repos:list");
    const data = { username };
    try {
      const response = await this.api.users.orgListUserOrgs(username);
      return await this.notifyAndReturn<Organization[]>(
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

  async getByName(username: string) {
    const label = this.labelFor("repos:list");
    const data = { username };
    try {
      const response = await this.api.users.userGet(username);
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
