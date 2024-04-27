import { RepoAccessor } from "./repo-accesser";

export interface IRepoTeamController {
  addTeam(teamId: string): Promise<any>;
}

export class GiteaRepoTeamController extends RepoAccessor {
  async addTeam(teamId: string) {
    const response = await this.api.repos.repoAddTeam(
      this.owner,
      this.repoName,
      teamId
    );
    return response.data;
  }

  // repoDeleteTeam: (owner: string, repo: string, team: string
  // repoListTeams: (owner: string, repo: string
  // repoCheckTeam: (owner: string, repo: string, team: string
}
