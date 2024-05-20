import { CreateOrgOption, Organization } from "gitea-js";
import { IOrgTeamController, OrgTeamController } from "./teams/controller";
import {
  IOrganizationMemberController,
  OrgMemberController,
} from "./members/controller";
import { OrgAccessor } from "./org-accessor";
import { IMainController } from "../main";

export interface IOrgController {
  organization?: Organization;
  username?: string;
  teams: IOrgTeamController;
  members: IOrganizationMemberController;
  setOrganization(organization: Organization): IOrgController;
  create(username: string, opts: CreateOrgOption): Promise<Organization>;
  getByName(name: string): Promise<Organization>;
  delete(name: string): Promise<any>;
}

export class GiteaOrgController extends OrgAccessor {
  $api = this.api.orgs;
  baseLabel = "orgs";

  teams: IOrgTeamController;
  members: IOrganizationMemberController;

  constructor(main: IMainController) {
    super(main);
    this.teams = this.createOrgTeamController();
    this.members = this.createOrgMemberController();
  }

  createOrgTeamController() {
    return new OrgTeamController(this.main);
  }

  createOrgMemberController() {
    return new OrgMemberController(this.main);
  }

  async create(username: string, opts: CreateOrgOption) {
    const fullOpts = {
      ...opts,
      username,
    };
    const label = this.labelFor("create");
    const data = { ...opts, username };
    try {
      const response = await this.$api.orgCreate(fullOpts);
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

  async getByName(name = this.name) {
    if (!name) {
      throw new Error("Missing org name");
    }
    const label = this.labelFor("delete");
    const data = { name };
    try {
      const response = await this.api.orgs.orgGet(name);
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

  async delete(name = this.name) {
    if (!name) {
      throw new Error("Missing org name");
    }
    const label = this.labelFor("delete");
    const data = { name };
    try {
      const response = await this.api.orgs.orgDelete(name);
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

  // orgListRepos: (org: string, query?
}
