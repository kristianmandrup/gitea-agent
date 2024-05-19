import {
  CreateMilestoneOption,
  EditMilestoneOption,
  Milestone,
} from "gitea-js";
import { RepoBaseController } from "../repo-base-controller";

export interface IRepoIssueMilestoneController {
  setId(id: string): this;
  create(opts: CreateMilestoneOption): Promise<Milestone>;
  list(query?: any): Promise<Milestone[]>;
  getById(id?: string): Promise<Milestone>;
  delete(id?: string): Promise<void>;
  edit(id: string, opts: EditMilestoneOption): Promise<Milestone>;
}

export class GiteaRepoIssueMilestoneController
  extends RepoBaseController
  implements IRepoIssueMilestoneController
{
  baseLabel = "repo:milestone";

  id?: string;
  setId(id: string) {
    this.id = id;
    return this;
  }

  async create(opts: CreateMilestoneOption) {
    const label = this.labelFor("create");
    const data = opts;
    try {
      const response = await this.$api.issueCreateMilestone(
        this.owner,
        this.repoName,
        opts
      );
      return await this.notifyAndReturn<Milestone>(
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

  async list(query?: any) {
    const label = this.labelFor("create");
    const data = { query };
    try {
      const response = await this.api.repos.issueGetMilestonesList(
        this.owner,
        this.repoName,
        query
      );
      return await this.notifyAndReturn<Milestone[]>(
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

  async getById(id = this.id) {
    if (!id) {
      throw new Error("Missing id");
    }
    const label = this.labelFor("get");
    const data = { id };
    try {
      const response = await this.api.repos.issueGetMilestone(
        this.owner,
        this.repoName,
        id
      );
      return await this.notifyAndReturn<Milestone>(
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

  async delete(id = this.id) {
    if (!id) {
      throw new Error("Missing id");
    }
    const label = this.labelFor("delete");
    const data = { id };
    try {
      const response = await this.api.repos.issueDeleteMilestone(
        this.owner,
        this.repoName,
        id
      );
      return await this.notifyAndReturn<Milestone>(
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

  async edit(id = this.id, opts: EditMilestoneOption) {
    if (!id) {
      throw new Error("Missing id");
    }
    const label = this.labelFor("delete");
    const data = { id, ...opts };
    try {
      const response = await this.api.repos.issueEditMilestone(
        this.owner,
        this.repoName,
        id,
        opts
      );
      return await this.notifyAndReturn<Milestone>(
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
