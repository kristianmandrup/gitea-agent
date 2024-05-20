import { CreateTeamOption, Team } from "gitea-js";
import { OrgAccessor } from "../org-accessor";
import {
  IOrgTeamReposController,
  OrgTeamReposController,
} from "./repos/controller";
import { IMainController } from "../../main";

export interface IOrgTeamController {
  repos: IOrgTeamReposController;

  setTeamId(teamId: number): this;
  search(query: any): Promise<Team[]>;
  create(teamName: string, opts?: CreateTeamOption): Promise<Team>;
  list(query?: any): Promise<Team[]>;
}

export class OrgTeamController
  extends OrgAccessor
  implements IOrgTeamController
{
  $api = this.api.orgs;
  baseLabel = "orgs:teams";
  teamId?: number;

  repos: IOrgTeamReposController;

  constructor(main: IMainController) {
    super(main);
    this.repos = this.createOrgTeamReposController();
  }

  createOrgTeamReposController() {
    return new OrgTeamReposController(this.main);
  }

  setTeamId(teamId: number) {
    this.teamId = teamId;
    return this;
  }

  async search(query: any) {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const label = this.labelFor("search");
    const data = { query };
    try {
      const response = await this.api.orgs.teamSearch(this.name, query);
      return await this.notifyAndReturn<Team[]>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn(
        { label, error, returnVal: [] },
        data
      );
    }
  }

  async create(teamName: string, opts?: CreateTeamOption) {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const fullOpts = {
      ...(opts || {}),
      name: teamName,
    };
    const label = this.labelFor("create");
    const data = { ...fullOpts };
    try {
      const response = await this.api.orgs.orgCreateTeam(this.name, fullOpts);
      return await this.notifyAndReturn<Team[]>(
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

  async list(query?: any) {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const label = this.labelFor("list");
    const data = { query };
    try {
      const response = await this.api.orgs.orgListTeams(this.name, query);
      return await this.notifyAndReturn<Team[]>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn(
        { label, error, returnVal: [] },
        data
      );
    }
  }
}
