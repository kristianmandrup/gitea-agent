import { Team } from "gitea-js";
import { RepoAccessor } from "../repo-accesser";

export interface IRepoTeamController {
  setId(id: string): this;
  check(id?: string): Promise<Team>;
  add(newTeamId: string): Promise<any>;
  delete(id?: string): Promise<any>;
  list(): Promise<Team[]>;
}

export class GiteaRepoTeamController extends RepoAccessor {
  id?: string;

  setId(id: string) {
    this.id = id;
    return this;
  }

  async check(id = this.id) {
    if (!id) {
      throw new Error("Missing team id");
    }
    const response = await this.api.repos.repoCheckTeam(
      this.owner,
      this.repoName,
      id
    );
    return response.data;
  }

  async add(newTeamId: string) {
    const response = await this.api.repos.repoAddTeam(
      this.owner,
      this.repoName,
      newTeamId
    );
    return response.data;
  }

  async delete(id = this.id) {
    if (!id) {
      throw new Error("Missing team id");
    }
    const response = await this.api.repos.repoDeleteTeam(
      this.owner,
      this.repoName,
      id
    );
    return response.data;
  }

  async list() {
    const response = await this.api.repos.repoListTeams(
      this.owner,
      this.repoName
    );
    return response.data;
  }
}
