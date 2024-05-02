import { CreateTeamOption, EditTeamOption, Team } from "gitea-js";
import { OrgAccessor } from "../controller";

export interface IOrgTeamController {
  setTeamId(teamId: number): this;
  search(query: any): Promise<any>;
  create(teamName: string, opts?: CreateTeamOption): Promise<Team>;
  list(query?: any): Promise<Team[]>;
}

export class OrgTeamController
  extends OrgAccessor
  implements IOrgTeamController
{
  teamId?: number;

  setTeamId(teamId: number) {
    this.teamId = teamId;
    return this;
  }

  async search(query: any) {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const response = await this.api.orgs.teamSearch(this.name, query);
    return response.data;
  }

  async create(teamName: string, opts?: CreateTeamOption) {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const fullOpts = {
      ...(opts || {}),
      name: teamName,
    };
    const response = await this.api.orgs.orgCreateTeam(this.name, fullOpts);
    return response.data;
  }

  async list(query?: any) {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const response = await this.api.orgs.orgListTeams(this.name, query);
    return response.data;
  }
}
