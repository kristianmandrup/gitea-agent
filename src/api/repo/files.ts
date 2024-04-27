import { ChangeFilesOptions, FilesResponse } from "gitea-js";
import { RepoAccessor } from "./repo-accesser";
import { IRepoController } from "./repository";

export interface IRepoFilesController {
  changeFiles(opts: ChangeFilesOptions): Promise<FilesResponse>;
}
export class GiteaRepoFilesController extends RepoAccessor {
  constructor(repo: IRepoController) {
    super(repo);
  }

  async changeFiles(opts: ChangeFilesOptions) {
    const response = await this.api.repos.repoChangeFiles(
      this.owner,
      this.repoName,
      opts
    );
    return response.data;
  }
}
