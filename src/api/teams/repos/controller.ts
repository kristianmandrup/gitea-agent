import { Repository, Team } from "gitea-js";
import { GiteaMainAccessor } from "../../main-accesser";
import { IMainController } from "../../main";

export interface ITeamReposController {
  team?: Team;
  teamId?: number;
  setTeam(team: Team): this;
  setId(teamId: number): this;
  list(id?: number): Promise<Repository[]>;
  add(id: number, org: string, repo: string): Promise<any>;
  remove(id: number, org: string, repo: string): Promise<any>;
}

export class GiteaTeamReposController
  extends GiteaMainAccessor
  implements ITeamReposController
{
  team?: Team;
  teamId?: number;

  constructor(main: IMainController, team?: Team) {
    super(main);
    this.team = team;
  }

  get id() {
    return this.team?.id || this.teamId;
  }

  setTeam(team: Team) {
    this.team = team;
    return this;
  }

  setId(teamId: number) {
    this.teamId = teamId;
    return this;
  }

  async list(id = this.id, query?: any) {
    if (!id) {
      throw new Error("Team is missing id");
    }

    const response = await this.api.teams.orgListTeamRepos(id, query);
    return response.data;
  }

  async add(id: number, org: string, repo: string) {
    if (!this.id) {
      throw new Error("Team is missing id");
    }

    const response = await this.api.teams.orgAddTeamRepository(id, org, repo);
    return response.data;
  }

  async remove(id: number, org: string, repo: string) {
    if (!this.id) {
      throw new Error("Team is missing id");
    }

    const response = await this.api.teams.orgRemoveTeamRepository(
      id,
      org,
      repo
    );
    return response.data;
  }
}
