import {
  CreateKeyOption,
  CreateOrgOption,
  CreateRepoOption,
  CreateUserOption,
  Organization,
  Repository,
} from "gitea-js";
import { IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";

export interface IAdminController {
  createOrg(username: string, opts: CreateOrgOption): Promise<Organization>;
  createRepo(username: string, opts: CreateRepoOption): Promise<Repository>;
}

export class GiteaAdminController extends GiteaMainAccessor {
  constructor(main: IMainController) {
    super(main);
  }

  async createOrg(username: string, opts: CreateOrgOption) {
    const response = await this.api.admin.adminCreateOrg(username, opts);
    return response.data;
  }

  async createRepo(username: string, opts: CreateRepoOption) {
    const response = await this.api.admin.adminCreateRepo(username, opts);
    return response.data;
  }
}
