import {
  CreateOrgOption,
  CreateRepoOption,
  Organization,
  Repository,
} from "gitea-js";
import { IMainController } from "../main";
import { GiteaMainAccessor } from "../main-accesser";
import {
  GiteaAdminUserController,
  IGiteaAdminUserController,
} from "./users/controller";
import {
  GiteaAdminPublicKeyController,
  IGiteaAdminPublicKeyController,
} from "./public_key/controller";

export interface IAdminController {
  createOrg(username: string, opts: CreateOrgOption): Promise<Organization>;
  createRepo(username: string, opts: CreateRepoOption): Promise<Repository>;
}

export class GiteaAdminController extends GiteaMainAccessor {
  $api = this.api.admin;
  baseLabel = "admin";

  users: IGiteaAdminUserController;
  keys: IGiteaAdminPublicKeyController;

  constructor(main: IMainController) {
    super(main);
    this.users = this.createAdminUserController();
    this.keys = this.createAdminPublicKeyController();
  }

  protected createAdminUserController() {
    return new GiteaAdminUserController(this.main);
  }

  protected createAdminPublicKeyController() {
    return new GiteaAdminPublicKeyController(this.main);
  }

  async createOrg(username: string, opts: CreateOrgOption) {
    const label = this.labelFor("organization:create");
    const data = { username };
    try {
      const response = await this.$api.adminCreateOrg(username, opts);
      return await this.notifyAndReturn<Organization>(
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

  async createRepo(username: string, opts: CreateRepoOption) {
    const label = this.labelFor("repo:create");
    const data = { username };
    try {
      const response = await this.$api.adminCreateRepo(username, opts);
      return await this.notifyAndReturn<Repository>(
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
