import {
  ChangeFileOperation,
  ChangeFilesOptions,
  ContentsResponse,
  CreateFileOptions,
  DeleteFileOptions,
  FileDeleteResponse,
  FileResponse,
  FilesResponse,
  HttpResponse,
  UpdateFileOptions,
} from "gitea-js";
import { RepoAccessor } from "../repo-accesser";
import { IRepoController } from "../repository/controller";

export interface IRepoFilesController {
  getRaw(filepath: string, ref?: string): Promise<HttpResponse<void, any>>;
  getRootEntries(filepath: string): Promise<ContentsResponse[]>;
  getContent(filepath: string): Promise<ContentsResponse>;
  create(
    filepath: string,
    content: string,
    opts?: CreateFileOptions
  ): Promise<FileResponse>;
  delete(
    filepath: string,
    sha: string,
    opts?: DeleteFileOptions
  ): Promise<FileDeleteResponse>;
  applyDiffPatch(
    content: string,
    opts: UpdateFileOptions
  ): Promise<FileResponse>;
  changes(
    files: ChangeFileOperation[],
    opts: ChangeFilesOptions
  ): Promise<FilesResponse>;
}
export class GiteaRepoFilesController extends RepoAccessor {
  constructor(repo: IRepoController) {
    super(repo);
  }

  async getRaw(filepath: string, ref?: string) {
    const response = await this.api.repos.repoGetRawFile(
      this.owner,
      this.repoName,
      filepath,
      {
        ref,
      }
    );
    const notification = {
      ...this.repoData,
      filepath,
    };
    await this.notify("repo:file:get_raw", notification);
    return response;
  }

  // Gets the metadata of all the entries of the root dir
  async getRootEntries(filepath: string) {
    const response = await this.api.repos.repoGetContentsList(
      this.owner,
      this.repoName
    );
    const notification = {
      ...this.repoData,
      filepath,
    };
    await this.notify("repo:file:get_root_entries", notification);
    return response.data;
  }
  // Gets the metadata and contents (if a file) of an entry in a repository, or a list of entries if a dir
  async getContent(filepath: string) {
    const response = await this.api.repos.repoGetContents(
      this.owner,
      this.repoName,
      filepath
    );
    const notification = {
      ...this.repoData,
      filepath,
    };
    await this.notify("repo:file:get_content", notification);
    return response.data;
  }

  // Create a file in a repository
  async create(filepath: string, content: string, opts?: CreateFileOptions) {
    const fullOpts = {
      ...(opts || {}),
      content,
    };
    const response = await this.api.repos.repoCreateFile(
      this.owner,
      this.repoName,
      filepath,
      fullOpts
    );
    const notification = {
      ...this.repoData,
      ...opts,
    };
    await this.notify("repo:file:create", notification);
    return response.data;
  }

  // Delete a file in a repository
  async delete(filepath: string, sha: string, opts?: DeleteFileOptions) {
    const fullOpts = {
      ...(opts || {}),
      sha,
    };
    const response = await this.api.repos.repoDeleteFile(
      this.owner,
      this.repoName,
      filepath,
      fullOpts
    );
    const notification = {
      ...this.repoData,
      ...opts,
    };
    await this.notify("repo:file:delete", notification);
    return response.data;
  }

  // Apply diff patch to repository
  async applyDiffPatch(content: string, opts: UpdateFileOptions) {
    const fullOpts = {
      ...(opts || {}),
      content,
    };
    const response = await this.api.repos.repoApplyDiffPatch(
      this.owner,
      this.repoName,
      fullOpts
    );
    const notification = {
      ...this.repoData,
      ...opts,
    };
    await this.notify("repo:file:apply_diff_patch", notification);
    return response.data;
  }

  // content, path, operation
  // This is essentially a commit
  // The response contains:
  // commit?: FileCommitResponse;
  // files?: ContentsResponse[];
  // The FileCommitResponse contains
  // message?: string;
  // parents?: CommitMeta[];
  // sha?: string;
  // tree?: CommitMeta;
  // CommitMeta contains:
  // created?: string;
  // sha?: string;
  // url?: string;

  // The ContentsResponse contains:
  // last_commit_sha?: string;
  // name?: string;
  // path?: string;
  // sha?: string;

  async changes(
    files: ChangeFileOperation[],
    opts?: ChangeFilesOptions
  ): Promise<FilesResponse> {
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
