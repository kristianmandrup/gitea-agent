import {
  CreatePullReviewOptions,
  PullRequest,
  PullReview,
  PullReviewRequestOptions,
} from "gitea-js";
import { RepoAccessor } from "./repo-accesser";
import { IRepoController } from "./repository";

export interface IPullRequestReviewController {
  createPullReviewRequests(
    opts: PullReviewRequestOptions
  ): Promise<PullReview[]>;
  createPullRequestReview(opts: CreatePullReviewOptions): Promise<PullReview>;
}

export class GiteaPullRequestReviewController extends RepoAccessor {
  pr?: PullRequest;

  constructor(repo: IRepoController) {
    super(repo);
  }

  get index() {
    return this.pr?.id;
  }

  setPullRequest(pr: PullRequest) {
    this.pr = pr;
  }

  async createPullReviewRequests(opts: PullReviewRequestOptions) {
    if (!this.index) {
      throw new Error(`PR is missing or has no index`);
    }
    const response = await this.api.repos.repoCreatePullReviewRequests(
      this.owner,
      this.repoName,
      this.index,
      opts
    );
    return response.data;
  }

  async createPullRequestReview(opts: CreatePullReviewOptions) {
    if (!this.index) {
      throw new Error(`PR is missing or has no index`);
    }

    const response = await this.api.repos.repoCreatePullReview(
      this.owner,
      this.repoName,
      this.index,
      opts
    );
    return response.data;
  }
}
