import { Team } from "gitea-js";
import { RepoBaseController } from "../repo-base-controller";

export interface IRepoTeamController {
  setId(id: string): this;
  check(id?: string): Promise<Team>;
  add(newTeamId: string): Promise<any>;
  delete(id?: string): Promise<any>;
  list(): Promise<Team[]>;
}

export class GiteaRepoTeamController
  extends RepoBaseController
  implements IRepoTeamController
{
  baseLabel = "repo:team";

  id?: string;

  setId(id: string) {
    this.id = id;
    return this;
  }

  async check(id = this.id) {
    if (!id) {
      throw new Error("Missing team id");
    }
    const label = this.labelFor("check");
    const data = { id };
    try {
      const response = await this.$api.repoCheckTeam(
        this.owner,
        this.repoName,
        id
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

  async add(id: string) {
    const label = this.labelFor("add");
    const data = { id };
    try {
      const response = await this.$api.repoAddTeam(
        this.owner,
        this.repoName,
        id
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

  async delete(id = this.id) {
    if (!id) {
      throw new Error("Missing team id");
    }
    const label = this.labelFor("delete");
    const data = { id };
    try {
      const response = await this.$api.repoDeleteTeam(
        this.owner,
        this.repoName,
        id
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

  async list() {
    const label = this.labelFor("add");
    const data = {};
    try {
      const response = await this.$api.repoListTeams(this.owner, this.repoName);
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
}
