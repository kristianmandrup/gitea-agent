import {
  CreateMilestoneOption,
  EditMilestoneOption,
  Issue,
  Milestone,
} from "gitea-js";
import { RepoAccessor } from "../repo-accesser";
import { IRepoController } from "../repository/controller";

export interface IRepoIssueMilestoneController {
  setId(id: string): this;
  create(opts: CreateMilestoneOption): Promise<Milestone>;
  list(query?: any): Promise<Milestone[]>;
  getById(id?: string): Promise<Milestone>;
  delete(id?: string): Promise<void>;
  edit(id: string, opts: EditMilestoneOption): Promise<Milestone>;
}

export class GiteaRepoIssueMilestoneController extends RepoAccessor {
  id?: string;

  constructor(repo: IRepoController) {
    super(repo);
  }

  setId(id: string) {
    this.id = id;
    return this;
  }

  async create(opts: CreateMilestoneOption) {
    const response = await this.api.repos.issueCreateMilestone(
      this.owner,
      this.repoName,
      opts
    );
    const notification = {
      ...this.repoData,
      opts,
    };
    await this.notify("issue:milestone:create", notification);
    return response.data;
  }

  async list(query?: any) {
    const response = await this.api.repos.issueGetMilestonesList(
      this.owner,
      this.repoName,
      query
    );
    return response.data;
  }

  async getById(id = this.id) {
    if (!id) {
      throw new Error("Missing id");
    }
    const response = await this.api.repos.issueGetMilestone(
      this.owner,
      this.repoName,
      id
    );
    return response.data;
  }

  async delete(id = this.id) {
    if (!id) {
      throw new Error("Missing id");
    }
    const response = await this.api.repos.issueDeleteMilestone(
      this.owner,
      this.repoName,
      id
    );
    const notification = {
      ...this.repoData,
      id,
    };
    await this.notify("issue:milestone:delete", notification);
    return response.data;
  }

  async edit(id = this.id, opts: EditMilestoneOption) {
    if (!id) {
      throw new Error("Missing id");
    }
    const response = await this.api.repos.issueEditMilestone(
      this.owner,
      this.repoName,
      id,
      opts
    );
    const notification = {
      ...this.repoData,
      id,
      opts,
    };
    await this.notify("issue:milestone:edit", notification);
    return response.data;
  }
}
