import { RepoAccessor } from "../repo-accesser";
import { CreateWikiPageOptions, WikiPage, WikiPageMetaData } from "gitea-js";
import { RepoBaseController } from "../repo-base-controller";

export interface IWikiPageController {
  createPage(opts?: CreateWikiPageOptions): Promise<WikiPage>;
  getPage(pageName: string): Promise<WikiPage>;
  deletePage(pageName: string): Promise<any>;
  updatePage(pageName: string, opts: CreateWikiPageOptions): Promise<WikiPage>;
  listPages(): Promise<WikiPageMetaData[]>;
}

export class GiteaRepoWikiPageController
  extends RepoBaseController
  implements IWikiPageController
{
  baseLabel = "repo:wiki";

  async createPage(opts: CreateWikiPageOptions = {}) {
    const label = this.labelFor("pages:create");
    const data = { ...opts };
    try {
      const response = await this.$api.repoCreateWikiPage(
        this.owner,
        this.repoName,
        opts
      );
      return await this.notifyAndReturn<WikiPage>(
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

  async getPage(name: string) {
    const label = this.labelFor("pages:get");
    const data = { name };
    try {
      const response = await this.$api.repoGetWikiPage(
        this.owner,
        this.repoName,
        name
      );
      return await this.notifyAndReturn<WikiPage>(
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

  async deletePage(name: string) {
    const label = this.labelFor("pages:delete");
    const data = { name };
    try {
      const response = await this.api.repos.repoDeleteWikiPage(
        this.owner,
        this.repoName,
        name
      );
      return await this.notifyAndReturn<any>(
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

  async updatePage(name: string, opts: CreateWikiPageOptions) {
    const label = this.labelFor("pages:update");
    const data = { name };
    try {
      const response = await this.$api.repoEditWikiPage(
        this.owner,
        this.repoName,
        name,
        opts
      );
      return await this.notifyAndReturn<WikiPage>(
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

  async listPages() {
    const label = this.labelFor("pages:list");
    const data = { name };
    try {
      const response = await this.$api.repoGetWikiPages(
        this.owner,
        this.repoName
      );
      return await this.notifyAndReturn<WikiPageMetaData[]>(
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
