import {
  CreatePullReviewOptions,
  PullRequest,
  PullReview,
  PullReviewRequestOptions,
} from "gitea-js";
import { RepoAccesser } from "./repo-accesser";
import { GiteaRepositoryController } from "./repository";

export interface IPullRequestReviewController {
  createPullReviewRequests(
    opts: PullReviewRequestOptions
  ): Promise<PullReview[]>;
  createPullRequestReview(opts: CreatePullReviewOptions): Promise<PullReview>;
}

export class GiteaPullRequestReviewController extends RepoAccesser {
  pr?: PullRequest;

  constructor(repository: GiteaRepositoryController) {
    super(repository);
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
