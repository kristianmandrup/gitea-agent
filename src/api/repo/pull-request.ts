import { RepoAccessor } from "./repo-accesser";
import { ChangedFile, CreatePullRequestOption, PullRequest } from "gitea-js";
import {
  GiteaRepositoryController,
  IRepoController,
} from "./repository/controller";
import {
  GiteaPullRequestReviewController,
  IPullRequestReviewController,
} from "./pr-review";

export type MergeStyle = "merge" | "rebase";

export interface IPullRequestController {
  createPullRequest(opts: {
    assignees?: string[];
    title?: string;
    body?: string;
  }): Promise<any>;
  getPullRequest(index: number): Promise<PullRequest>;
  listPullRequests(): Promise<PullRequest[]>;
  listPullRequests(): Promise<PullRequest[]>;
  getPullRequestFiles(index?: number): Promise<ChangedFile[]>;
}

export class GiteaPullRequestController extends RepoAccessor {
  reviews: IPullRequestReviewController;
  index?: number;

  constructor(repo: IRepoController, index?: number) {
    super(repo);
    this.reviews = this.createPullRequestReviewController();
    index && this.setIndex(index);
  }

  setIndex(index: number) {
    this.index = index;
    return this;
  }

  createPullRequestReviewController() {
    return new GiteaPullRequestReviewController(this.repo);
  }

  // CreatePullRequestOption
  // Use /compare endpoint to compare base and head to get the diffs of the files
  // See FileChangeHandler
  // CreatePullRequestOption contains:
  // assignee?: string;
  // assignees?: string[];
  // base?: string; - base commit of the PR (first commit part of PR)
  // body?: string;
  // /** @format date-time */
  // due_date?: string;
  // head?: string; - head of the PR (latest commits)
  // labels?: number[];
  // /** @format int64 */
  // milestone?: number;
  // title?: string;

  async createPullRequest(opts: CreatePullRequestOption) {
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

  async getPullRequest(index = this.index) {
    if (!index) {
      throw new Error("Missing PR index");
    }
    const response = await this.api.repos.repoGetPullRequest(
      this.owner,
      this.repoName,
      index
    );
    return response.data;
  }

  // Merge PR's baseBranch into headBranch
  // repoUpdatePullRequest: (owner: string, repo: string, index: number
  async updatePullRequest(style: MergeStyle = "merge", index = this.index) {
    if (!index) {
      throw new Error("Missing PR index");
    }
    const response = await this.api.repos.repoUpdatePullRequest(
      this.owner,
      this.repoName,
      index,
      {
        style,
      }
    );
    return response.data;
  }

  async listPullRequests() {
    const response = await this.api.repos.repoListPullRequests(
      this.owner,
      this.repoName
    );
    return response.data;
  }

  // Get changed files for a pull request
  async getPullRequestFiles(index = this.index): Promise<ChangedFile[]> {
    if (!index) {
      throw new Error("Missing PR index");
    }
    const response = await this.api.repos.repoGetPullRequestFiles(
      this.owner,
      this.repoName,
      index
    );
    return response.data;
  }
}
