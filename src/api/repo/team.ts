import { RepoAccesser } from "./repo-accesser";

export interface ITeamController {
  addTeam(teamId: string): Promise<any>;
}

export class GiteaRepoTeamController extends RepoAccesser {
  async addTeam(teamId: string) {
    const response = await this.api.repos.repoAddTeam(
      this.owner,
      this.repoName,
      teamId
    );
    return response.data;
  }
}
