import {
  CreateIssueOption,
  Issue,
  IssueMeta,
  IssueTemplate,
  Comment,
} from "gitea-js";
import { RepoAccessor } from "./repo-accesser";
import { IRepoController } from "./repository/controller";
import {
  GiteaRepoIssueMilestoneController,
  IRepoIssueMilestoneController,
} from "./milestones";

export interface IRepoIssueController {
  list(): Promise<Issue[]>;
  create(title: string, body: string, opts: CreateIssueOption): Promise<Issue>;
  addComment(body: string, index?: number): Promise<Comment>;
  getComments(id: number): Promise<Comment[]>;
  search(query: string, opts?: any): Promise<Issue[]>;
  repoGetIssueTemplates(): Promise<IssueTemplate[]>;
  getById(id: number): Promise<Issue>;
  listBlockedByIssue(id: string): Promise<Issue[]>;
  createBlockingIssue(id: string, opts: IssueMeta): Promise<Issue>;
  removeBlockingIssue(id: string, opts: IssueMeta): Promise<Issue>;
}

export class GiteaRepoIssueController extends RepoAccessor {
  issue?: Issue;
  milestones: IRepoIssueMilestoneController;

  constructor(repo: IRepoController) {
    super(repo);
    this.milestones = this.createIssueMilestoneController();
  }

  protected createIssueMilestoneController() {
    return new GiteaRepoIssueMilestoneController(this.repo);
  }

  get index() {
    return this.issue?.id;
  }

  setIssue(issue: Issue) {
    this.issue = issue;
  }

  async list() {
    const response = await this.api.repos.issueListIssues(
      this.owner,
      this.repoName
    );
    return response.data;
  }

  async create(title: string, body: string, opts: CreateIssueOption) {
    const response = await this.api.repos.issueCreateIssue(
      this.owner,
      this.repoName,
      { ...opts, body, title }
    );
    const notification = {
      ...this.repoData,
      ...opts,
      body,
      title,
    };
    await this.notify("issue:create", notification);
    return response.data;
  }

  async addComment(body: string, index = this.index) {
    if (!index) {
      throw new Error(`Issue is missing or has no index`);
    }
    const response = await this.api.repos.issueCreateComment(
      this.owner,
      this.repoName,
      index,
      { body }
    );
    const notification = {
      ...this.repoData,
      index,
      body,
    };
    await this.notify("issue:comment:create", notification);
    return response.data;
  }

  async getComments(id: number) {
    const response = await this.api.repos.issueGetComments(
      this.owner,
      this.repoName,
      id
    );
    return response.data;
  }

  async search(query: string, opts?: any) {
    const response = await this.api.repos.issueSearchIssues({
      ...opts,
      query,
    });
    return response.data;
  }

  async repoGetIssueTemplates() {
    const response = await this.api.repos.repoGetIssueTemplates(
      this.owner,
      this.repoName
    );
    return response.data;
  }

  async getById(id: number) {
    const response = await this.api.repos.issueGetIssue(
      this.owner,
      this.repoName,
      id
    );
    return response.data;
  }

  async listBlockedByIssue(id: string) {
    const response = await this.api.repos.issueListBlocks(
      this.owner,
      this.repoName,
      id
    );
    return response.data;
  }

  async createBlockingIssue(id: string, opts: IssueMeta) {
    const response = await this.api.repos.issueCreateIssueBlocking(
      this.owner,
      this.repoName,
      id,
      opts
    );
    return response.data;
  }

  async removeBlockingIssue(id: string, opts: IssueMeta) {
    const response = await this.api.repos.issueRemoveIssueBlocking(
      this.owner,
      this.repoName,
      id,
      opts
    );
    return response.data;
  }

  // issueListIssueAttachments: (owner: string, repo: string, index: number
  // issueGetIssueAttachment: (owner: string, repo: string, index: number, attachmentId: number
  // issueCreateIssueAttachment: (owner: string, repo: string, index: number, data: {
  //   /** attachment to upload */
  //   attachment: File;

  // issueCheckSubscription: (owner: string, repo: string, index: number
  // issueAddSubscription: (owner: string, repo: string, index: number, user: string
  // Get users who subscribed on an issue.
  // issueSubscriptions: (owner: string, repo: string, index: number

  // issueAddLabel: (owner: string, repo: string, index: number, body: IssueLabelsOption
  // issueGetLabels: (owner: string, repo: string, index: number
}
