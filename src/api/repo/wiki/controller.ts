import { RepoAccessor } from "../repo-accesser";
import { CreateWikiPageOptions } from "gitea-js";

export interface IWikiPageController {
  createPage(opts?: CreateWikiPageOptions): Promise<any>;
  getPage(pageName: string): Promise<any>;
  deletePage(pageName: string): Promise<any>;
  updatePage(pageName: string, opts: CreateWikiPageOptions): Promise<any>;
  listPages(): Promise<any>;
}

export class GiteaRepoWikiPageController extends RepoAccessor {
  async createPage(opts: CreateWikiPageOptions = {}) {
    const response = await this.api.repos.repoCreateWikiPage(
      this.owner,
      this.repoName,
      opts
    );
    const notification = {
      ...this.repoData,
      ...opts,
    };
    await this.notify("repo:wiki:create", notification);
    return response.data;
  }

  async getPage(pageName: string) {
    const response = await this.api.repos.repoGetWikiPage(
      this.owner,
      this.repoName,
      pageName
    );
    return response.data;
  }

  async deletePage(pageName: string) {
    const response = await this.api.repos.repoDeleteWikiPage(
      this.owner,
      this.repoName,
      pageName
    );
    return response.data;
  }

  async updatePage(pageName: string, opts: CreateWikiPageOptions) {
    const response = await this.api.repos.repoEditWikiPage(
      this.owner,
      this.repoName,
      pageName,
      opts
    );
    return response.data;
  }

  async listPages() {
    const response = await this.api.repos.repoGetWikiPages(
      this.owner,
      this.repoName
    );
    return response.data;
  }
}
