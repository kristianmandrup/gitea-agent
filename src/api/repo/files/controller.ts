import {
  ChangeFileOperation,
  ChangeFilesOptions,
  ContentsResponse,
  CreateFileOptions,
  DeleteFileOptions,
  FileDeleteResponse,
  FileResponse,
  FilesResponse,
  UpdateFileOptions,
} from "gitea-js";
import { RepoBaseController } from "../repo-base-controller";

export interface IRepoFilesController {
  getRaw(filepath: string, ref?: string): Promise<void>;
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
  ): Promise<FilesResponse | undefined>;
}
export class GiteaRepoFilesController extends RepoBaseController {
  baseLabel = "repo:files";

  async getRaw(filepath: string, ref?: string) {
    const label = this.labelFor("get_raw");
    const data = { filepath, ref };
    try {
      const response = await this.api.repos.repoGetRawFile(
        this.owner,
        this.repoName,
        filepath,
        {
          ref,
        }
      );
      return await this.notifyAndReturn<void>(
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

  // Gets the metadata of all the entries of the root dir
  async getRootEntries(filepath: string) {
    const label = this.labelFor("get_root_entries");
    const data = { filepath };
    try {
      const response = await this.api.repos.repoGetContentsList(
        this.owner,
        this.repoName
      );
      return await this.notifyAndReturn<ContentsResponse[]>(
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
  // Gets the metadata and contents (if a file) of an entry in a repository, or a list of entries if a dir
  async getContent(filepath: string) {
    const label = this.labelFor("get_content");
    const data = { filepath };
    try {
      const response = await this.api.repos.repoGetContents(
        this.owner,
        this.repoName,
        filepath
      );
      return await this.notifyAndReturn<ContentsResponse>(
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

  // Create a file in a repository
  async create(filepath: string, content: string, opts?: CreateFileOptions) {
    const fullOpts = {
      ...(opts || {}),
      filepath,
      content,
    };
    const label = this.labelFor("create");
    try {
      const response = await this.api.repos.repoCreateFile(
        this.owner,
        this.repoName,
        filepath,
        fullOpts
      );
      return await this.notifyAndReturn<FileResponse>(
        {
          label,
          response,
        },
        fullOpts
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, fullOpts);
    }
  }

  // Delete a file in a repository
  async delete(filepath: string, sha: string, opts?: DeleteFileOptions) {
    const fullOpts = {
      ...(opts || {}),
      filepath,
      sha,
    };
    const label = this.labelFor("delete");
    try {
      const response = await this.api.repos.repoDeleteFile(
        this.owner,
        this.repoName,
        filepath,
        fullOpts
      );
      return await this.notifyAndReturn<FileDeleteResponse>(
        {
          label,
          response,
        },
        fullOpts
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, fullOpts);
    }
  }

  // Apply diff patch to repository
  async applyDiffPatch(content: string, opts: UpdateFileOptions) {
    const fullOpts = {
      ...(opts || {}),
      content,
    };
    const label = this.labelFor("apply_diff_patch");
    try {
      const response = await this.api.repos.repoApplyDiffPatch(
        this.owner,
        this.repoName,
        fullOpts
      );
      return await this.notifyAndReturn<FileResponse>(
        {
          label,
          response,
        },
        fullOpts
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, fullOpts);
    }
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

  async changes(files: ChangeFileOperation[], opts?: ChangeFilesOptions) {
    const fullOpts = {
      ...(opts || {}),
      files,
    };
    const label = this.labelFor("changes");
    try {
      const response = await this.api.repos.repoChangeFiles(
        this.owner,
        this.repoName,
        fullOpts
      );
      return await this.notifyAndReturn<FilesResponse>(
        {
          label,
          response,
        },
        fullOpts
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, fullOpts);
    }
  }
}
