import { CreateTeamOption, Team } from "gitea-js";
import { OrgAccessor } from "../../org-accessor";

export interface IOrgTeamReposController {
  setTeamId(teamId: number): this;
  remove(id: any): Promise<any>;
  add(id: string): Promise<Team>;
  list(): Promise<Team[]>;
}

export class OrgTeamReposController
  extends OrgAccessor
  implements IOrgTeamReposController
{
  $api = this.api.orgs;
  baseLabel = "orgs:teams";
  teamId?: number;

  setTeamId(teamId: number) {
    this.teamId = teamId;
    return this;
  }

  async remove(repo: string, id = this.id) {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    if (!id) {
      throw new Error("Missing team id");
    }
    const label = this.labelFor("remove");
    const data = { id, repo };
    try {
      const response = await this.api.teams.orgRemoveTeamRepository(
        id,
        this.name,
        repo
      );
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

  async add(repo: string, id = this.id) {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    if (!id) {
      throw new Error("Missing team id");
    }
    const label = this.labelFor("remove");
    const data = { id, repo };
    try {
      const response = await this.api.teams.orgAddTeamRepository(
        id,
        this.name,
        repo
      );
      return await this.notifyAndReturn<Team>(
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

  async list(query: any = {}, id = this.teamId) {
    if (!id) {
      throw new Error("Missing team name");
    }
    const label = this.labelFor("list");
    const data = { query };
    try {
      const response = await this.api.teams.orgListTeamRepos(id, query);
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
