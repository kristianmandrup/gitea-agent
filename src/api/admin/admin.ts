import { CreateOrgOption, CreateUserOption } from "gitea-js";
import { GiteaApiAccesser } from "../api";

export class GiteaAdminController extends GiteaApiAccesser {
  constructor() {
    super();
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
