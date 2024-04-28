import { CreateReleaseOption, EditReleaseOption } from "gitea-js";
import { RepoAccessor } from "./repo-accesser";

export class GiteaRepoReleaseController extends RepoAccessor {
  async list(draft: boolean, prerelease: boolean, opts: any) {
    const response = await this.api.repos.repoListReleases(
      this.owner,
      this.repoName,
      {
        ...opts,
        "pre-release": prerelease,
        draft,
      }
    );
    return response.data;
  }

  async create(opts: CreateReleaseOption) {
    const response = await this.api.repos.repoCreatePullRequest(
      this.owner,
      this.repoName,
      opts
    );
    const notification = {
      ...this.repoData,
      ...opts,
    };
    await this.notify("repo:pull_request", notification);
    return response.data;
  }

  async getLatest() {
    const response = await this.api.repos.repoGetLatestRelease(
      this.owner,
      this.repoName
    );
    return response.data;
  }

  async getByTag(tag: string) {
    const response = await this.api.repos.repoGetReleaseByTag(
      this.owner,
      this.repoName,
      tag
    );
    return response.data;
  }

  async deleteByTag(tag: string) {
    const response = await this.api.repos.repoDeleteReleaseByTag(
      this.owner,
      this.repoName,
      tag
    );
    return response.data;
  }

  async getById(id: number) {
    const response = await this.api.repos.repoGetRelease(
      this.owner,
      this.repoName,
      id
    );
    return response.data;
  }

  async deleteById(id: number) {
    const response = await this.api.repos.repoDeleteRelease(
      this.owner,
      this.repoName,
      id
    );
    return response.data;
  }

  async editById(id: number, opts: EditReleaseOption) {
    const response = await this.api.repos.repoEditRelease(
      this.owner,
      this.repoName,
      id,
      opts
    );
    return response.data;
  }
}
