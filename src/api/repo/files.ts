import {
  ChangeFileOperation,
  ChangeFilesOptions,
  FilesResponse,
} from "gitea-js";
import { RepoAccessor } from "./repo-accesser";
import { IRepoController } from "./repository";

export interface IRepoFilesController {
  changeFiles(
    files: ChangeFileOperation[],
    opts: ChangeFilesOptions
  ): Promise<FilesResponse>;
}
export class GiteaRepoFilesController extends RepoAccessor {
  constructor(repo: IRepoController) {
    super(repo);
  }

  //   repoGetRawFile: (owner: string, repo: string, filepath: string, query?: {
  //     /** The name of the commit/branch/tag. Default the repository’s default branch (usually master) */
  //     ref?: string;
  // }

  // Gets the metadata of all the entries of the root dir
  // this.api.repos.repoGetContentsList;

  // Gets the metadata and contents (if a file) of an entry in a repository, or a list of entries if a dir
  // repoGetContents: (owner: string, repo: string, filepath: string

  // Create a file in a repository
  // repoCreateFile: (owner: string, repo: string, filepath: string, body: CreateFileOptions

  // Delete a file in a repository
  // repoDeleteFile: (owner: string, repo: string, filepath: string, body: DeleteFileOptions

  // Apply diff patch to repository
  // repoApplyDiffPatch: (owner: string, repo: string, body: UpdateFileOptions

  // content, path, operation
  async changeFiles(files: ChangeFileOperation[], opts?: ChangeFilesOptions) {
    const fullOpts = {
      ...(opts || {}),
      files,
    };

    const response = await this.api.repos.repoChangeFiles(
      this.owner,
      this.repoName,
      fullOpts
    );
    return response.data;
  }
}