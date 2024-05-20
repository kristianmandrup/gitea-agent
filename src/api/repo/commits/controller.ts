import { Commit } from "gitea-js";
import { RepoAccessor } from "../repo-accesser";
import { RepoBaseController } from "../repo-base-controller";

export interface IRepoCommitsController {
  getBySha(sha: string): Promise<Commit>;
  list(query?: any): Promise<Commit[]>;
}

export class GiteaRepoCommitsController
  extends RepoBaseController
  implements IRepoCommitsController
{
  baseLabel = "repo:commits";

  async getBySha(sha: string) {
    const label = this.labelFor("get");
    const data = { sha };
    try {
      const response = await this.api.repos.repoGetSingleCommit(
        this.owner,
        this.repoName,
        sha
      );
      return await this.notifyAndReturn<Commit>(
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
  // sha: SHA or branch to start listing commits from
  // filepath: filepath of a file/dir
  async list(query?: any) {
    const label = this.labelFor("get");
    const data = { query };
    try {
      const response = await this.api.repos.repoGetAllCommits(
        this.owner,
        this.repoName,
        query
      );
      return await this.notifyAndReturn<Commit[]>(
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
