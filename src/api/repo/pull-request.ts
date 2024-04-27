import { RepoAccessor } from "./repo-accesser";
import { PullRequest } from "gitea-js";
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
}

export class GiteaPullRequestController extends RepoAccessor {
  reviews: IPullRequestReviewController;

  constructor(repo: IRepoController) {
    super(repo);
    this.reviews = this.createPullRequestReviewController();
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

  async getPullRequest(index: number) {
    const response = await this.api.repos.repoGetPullRequest(
      this.owner,
      this.repoName,
      index
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
}
