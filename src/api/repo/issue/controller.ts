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
import {} from "../milestone/controller";
import {
  GiteaRepoIssueCommentController,
  IRepoIssueCommentController,
} from "./comments";
import { RepoBaseController } from "../repo-base-controller";

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

export class GiteaRepoIssueController extends RepoBaseController {
  issue?: Issue;
  comments: IRepoIssueCommentController;

  baseLabel = "repo:issue";

  constructor(repo: IRepoController) {
    super(repo);
    this.comments = this.createIssueCommentController();
  }

  createIssueCommentController() {
    return new GiteaRepoIssueCommentController(this.controller);
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
    const data = { ...opts, title, body };
    const label = this.labelFor("create");
    try {
      const response = await this.api.repos.issueCreateIssue(
        this.owner,
        this.repoName,
        { ...opts, body, title }
      );
      return await this.notifyAndReturn<Issue>(
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

  async changeState(state: string, index = this.index) {
    if (!index) {
      throw new Error("Missing index");
    }
    const data = { state, index };
    const label = this.labelFor("state:change");
    try {
      const response = await this.api.repos.issueEditIssue(
        this.owner,
        this.repoName,
        index,
        { state }
      );
      return await this.notifyAndReturn<Issue>(
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

  async edit(opts: EditIssueOption, index = this.index) {
    if (!index) {
      throw new Error("Missing index");
    }
    const data = { ...opts, index };
    const label = this.labelFor("edit");
    try {
      const response = await this.api.repos.issueEditIssue(
        this.owner,
        this.repoName,
        index,
        opts
      );
      return await this.notifyAndReturn<Issue>(
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

  async addComment(body: string, index = this.index) {
    if (!index) {
      throw new Error("Missing index");
    }
    const data = { body, index };
    const label = this.labelFor("comment:add");
    try {
      const response = await this.api.repos.issueCreateComment(
        this.owner,
        this.repoName,
        index,
        { body }
      );
      return await this.notifyAndReturn<Issue>(
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

  async getComments(id: number) {
    const label = this.labelFor("comments:get");
    const data = { id };
    try {
      const response = await this.api.repos.issueGetComments(
        this.owner,
        this.repoName,
        id
      );
      return await this.notifyAndReturn<Comment[]>(
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
