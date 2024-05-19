import { CreateReleaseOption, EditReleaseOption, Release } from "gitea-js";
import { RepoAccessor } from "../repo-accesser";
import { RepoBaseController } from "../repo-base-controller";

export type ReleaseTypes = { draft?: boolean; prerelease?: boolean };

export interface IRepoReleaseController {
  list(releasTypes?: ReleaseTypes, opts?: any): Promise<Release[]>;
  create(opts: CreateReleaseOption): Promise<any>;
  getLatest(): Promise<Release>;
  getByTag(tag: string): Promise<Release>;
  deleteByTag(tag: string): Promise<any>;
  getById(id: number): Promise<Release>;
  deleteById(id: number): Promise<any>;
  editById(id: number, opts: EditReleaseOption): Promise<any>;
}

export class GiteaRepoReleaseController
  extends RepoBaseController
  implements IRepoReleaseController
{
  baseLabel = "repo:releases";

  async list(releaseTypes: ReleaseTypes = {}, opts: any = {}) {
    const label = this.labelFor("list");
    const data = { releaseTypes, ...opts };
    try {
      const response = await this.api.repos.repoListReleases(
        this.owner,
        this.repoName,
        {
          ...opts,
          "pre-release": releaseTypes.prerelease,
          draft: releaseTypes.draft,
        }
      );
      return await this.notifyAndReturn<Release[]>(
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

  async create(opts: CreateReleaseOption) {
    const label = this.labelFor("create");
    const data = { ...opts };
    try {
      const response = await this.api.repos.repoCreateRelease(
        this.owner,
        this.repoName,
        opts
      );
      return await this.notifyAndReturn<Release>(
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

  async getLatest() {
    const label = this.labelFor("latest:get");
    const data = {};
    try {
      const response = await this.api.repos.repoGetLatestRelease(
        this.owner,
        this.repoName
      );
      return await this.notifyAndReturn<Release>(
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

  async getByTag(tag: string) {
    const label = this.labelFor("get:by_tag");
    const data = { tag };
    try {
      const response = await this.api.repos.repoGetReleaseByTag(
        this.owner,
        this.repoName,
        tag
      );
      return await this.notifyAndReturn<Release>(
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

  async deleteByTag(tag: string) {
    const label = this.labelFor("delete:by_tag");
    const data = { tag };
    try {
      const response = await this.api.repos.repoDeleteReleaseByTag(
        this.owner,
        this.repoName,
        tag
      );
      return await this.notifyAndReturn<Release>(
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

  async getById(id: number) {
    const label = this.labelFor("get:by_id");
    const data = { id };
    try {
      const response = await this.api.repos.repoGetRelease(
        this.owner,
        this.repoName,
        id
      );
      return await this.notifyAndReturn<Release>(
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

  async deleteById(id: number) {
    const label = this.labelFor("delete:by_id");
    const data = { id };
    try {
      const response = await this.api.repos.repoDeleteRelease(
        this.owner,
        this.repoName,
        id
      );
      return await this.notifyAndReturn<Release>(
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

  async editById(id: number, opts: EditReleaseOption) {
    const label = this.labelFor("edit:by_id");
    const data = { id };
    try {
      const response = await this.api.repos.repoEditRelease(
        this.owner,
        this.repoName,
        id,
        opts
      );
      return await this.notifyAndReturn<Release>(
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
