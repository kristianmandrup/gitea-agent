import { CreateOrgOption, CreateRepoOption, CreateUserOption } from "gitea-js";
import { IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";

export interface IAdminController {}

export class GiteaAdminController extends GiteaMainAccessor {
  constructor(main: IMainController) {
    super(main);
  }

  async createRepo(username: string, opts: CreateRepoOption) {
    const response = await this.api.admin.adminCreateRepo(username, opts);
    return response.data;
  }

  async createUser(opts: CreateUserOption) {
    const response = await this.api.admin.adminCreateUser(opts);
    return response.data;
  }

  // adminDeleteUser

  // adminDeleteUserPublicKey
  // adminDeleteUserPublicKey

  async createOrg(username: string, opts: CreateOrgOption) {
    const response = await this.api.admin.adminCreateOrg(username, opts);
    return response.data;
  }
}
