import { Commit } from "gitea-js";
import { RepoAccessor } from "../repo-accesser";

export interface IRepoCommitsController {
  getSingle(sha: string): Promise<Commit>;
  getAll(query?: any): Promise<Commit[]>;
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
  // sha: SHA or branch to start listing commits from
  // filepath: filepath of a file/dir
  async getAll(query?: any) {
    const response = await this.api.repos.repoGetAllCommits(
      this.owner,
      this.repoName,
      query
    );
    return response.data;
  }
}
