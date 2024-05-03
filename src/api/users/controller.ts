import {
  AccessToken,
  CreateAccessTokenOption,
  Organization,
  PublicKey,
  Repository,
} from "gitea-js";
import { GiteaApiAccessor } from "../api";
import { GiteaMainController, IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";
import {
  GiteaUserTokenController,
  IUserTokenController,
} from "./tokens/controller";

export interface IUserController {
  listKeys(username: string): Promise<PublicKey[]>;
  listRepos(username: string): Promise<Repository[]>;
  listOrgs(username: string): Promise<Organization[]>;
  getByName(username: string): Promise<any>;
}

export class GiteaUserController
  extends GiteaMainAccessor
  implements IUserController
{
  tokens: IUserTokenController;

  constructor(main: IMainController) {
    super(main);
    this.tokens = this.createUserTokenController();
  }

  protected createUserTokenController() {
    return new GiteaUserTokenController(this.main);
  }

  async listKeys(username: string) {
    const response = await this.api.users.userListKeys(username);
    return response.data;
  }

  async listRepos(username: string) {
    const response = await this.api.users.userListRepos(username);
    return response.data;
  }

  async listOrgs(username: string) {
    const response = await this.api.users.orgListUserOrgs(username);
    return response.data;
  }

  async getByName(username: string) {
    const response = await this.api.users.userGet(username);
    return response.data;
  }
}
