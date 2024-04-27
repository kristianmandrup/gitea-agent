import { RepoAccessor } from "./repo-accesser";
import { ChangedFile, PullRequest } from "gitea-js";
import { GiteaRepositoryController, IRepoController } from "./repository";
import {
  GiteaPullRequestReviewController,
  IPullRequestReviewController,
} from "./pr-review";

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

  async createPullRequest(opts: {
    assignees?: string[];
    // labels?: number[];
    title?: string;
    body?: string;
  }) {
    const response = await this.api.repos.repoCreatePullRequest(
      this.owner,
      this.repoName,
      opts
    );
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
