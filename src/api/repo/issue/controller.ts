import {
  CreateIssueOption,
  Issue,
  IssueMeta,
  IssueTemplate,
  Comment,
  EditIssueOption,
} from "gitea-js";
import { RepoAccessor } from "../repo-accesser";
import { IRepoController } from "../repository/controller";
import {
  GiteaRepoIssueMilestoneController,
  IRepoIssueMilestoneController,
} from "../milestone/controller";
import {
  GiteaRepoIssueCommentController,
  IRepoIssueCommentController,
} from "./comments";

export interface IRepoIssueController {
  comments: IRepoIssueCommentController;
  list(): Promise<Issue[]>;
  create(title: string, body: string, opts: CreateIssueOption): Promise<Issue>;
  edit(opts: EditIssueOption, index?: number): Promise<Issue>;
  changeState(state: string, index?: number): Promise<Issue>;
  addComment(body: string, index?: number): Promise<Comment>;
  getComments(id: number): Promise<Comment[]>;
  search(query: string, opts?: any): Promise<Issue[]>;
  repoGetIssueTemplates(): Promise<IssueTemplate[]>;
  getById(id: number): Promise<Issue>;
  delete(id: number): Promise<void>;
  listBlockedByIssue(id: string): Promise<Issue[]>;
  createBlockingIssue(id: string, opts: IssueMeta): Promise<Issue>;
  removeBlockingIssue(id: string, opts: IssueMeta): Promise<Issue>;
}

export class GiteaRepoIssueController extends RepoAccessor {
  issue?: Issue;
  comments: IRepoIssueCommentController;

  constructor(repo: IRepoController) {
    super(repo);
    this.comments = this.createIssueCommentController();
  }

  createIssueCommentController() {
    return new GiteaRepoIssueCommentController(this.repo);
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

  async changeState(state: string, index = this.index) {
    if (!index) {
      throw new Error(`Issue is missing or has no index`);
    }
    const response = await this.api.repos.issueEditIssue(
      this.owner,
      this.repoName,
      index,
      { state }
    );
    const notification = {
      ...this.repoData,
      state,
    };
    await this.notify("issue:state:change", notification);
    return response.data;
  }

  async edit(opts: EditIssueOption, index = this.index) {
    if (!index) {
      throw new Error(`Issue is missing or has no index`);
    }
    const response = await this.api.repos.issueEditIssue(
      this.owner,
      this.repoName,
      index,
      opts
    );
    const notification = {
      ...this.repoData,
      ...opts,
    };
    await this.notify("issue:edit", notification);
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

  async delete(id: number) {
    const response = await this.api.repos.issueDelete(
      this.owner,
      this.repoName,
      id
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
