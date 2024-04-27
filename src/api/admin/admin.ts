import { CreateOrgOption, CreateUserOption } from "gitea-js";
import { GiteaApiAccessor } from "../api";
import { IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";

export interface IAdminController {}

export class GiteaAdminController extends GiteaMainAccessor {
  constructor(main: IMainController) {
    super(main);
  }

  async createUser(opts: CreateUserOption) {
    const response = await this.api.admin.adminCreateUser(opts);
    return response.data;
  }

  async createOrg(username: string, opts: CreateOrgOption) {
    const response = await this.api.admin.adminCreateOrg(username, opts);
    return response.data;
  }
}
