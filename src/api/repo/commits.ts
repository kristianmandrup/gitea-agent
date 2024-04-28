import { Commit } from "gitea-js";
import { RepoAccessor } from "./repo-accesser";

export interface IRepoCommitsController {
  getSingle(sha: string): Promise<Commit>;
  getAll(): Promise<Commit[]>;
}

export class GiteaRepoCommitsController extends RepoAccessor {
  async getSingle(sha: string) {
    const response = await this.api.repos.repoGetSingleCommit(
      this.owner,
      this.repoName,
      sha
    );
    return response.data;
  }

  async getAll() {
    const response = await this.api.repos.repoGetAllCommits(
      this.owner,
      this.repoName
    );
    return response.data;
  }
}
