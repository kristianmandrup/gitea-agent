import { CreateTeamOption, EditTeamOption } from "gitea-js";
import { OrgAccessor } from "../controller";

export class OrgTeamController extends OrgAccessor {
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

  async createTeam(teamName: string, opts?: CreateTeamOption) {
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

  async listTeams(query?: any) {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const response = await this.api.orgs.orgListTeams(this.name, query);
    return response.data;
  }
}
