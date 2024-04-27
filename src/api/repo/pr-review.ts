import {
  CreatePullReviewOptions,
  DismissPullReviewOptions,
  PullRequest,
  PullReview,
  PullReviewRequestOptions,
  SubmitPullReviewOptions,
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

  async listPullReviews(id: number, index = this.index) {
    if (!index) {
      throw new Error(`PR is missing or has no index`);
    }
    const response = await this.api.repos.repoListPullReviews(
      this.owner,
      this.repoName,
      index
    );
    return response.data;
  }

  async getPullReview(id: number, index = this.index) {
    if (!index) {
      throw new Error(`PR is missing or has no index`);
    }
    const response = await this.api.repos.repoGetPullReview(
      this.owner,
      this.repoName,
      index,
      id
    );
    return response.data;
  }

  async deletePullReview(id: number, index = this.index) {
    if (!index) {
      throw new Error(`PR is missing or has no index`);
    }
    const response = await this.api.repos.repoDeletePullReview(
      this.owner,
      this.repoName,
      index,
      id
    );
    return response.data;
  }

  async getPullReviewComments(id: number, index = this.index) {
    if (!index) {
      throw new Error(`PR is missing or has no index`);
    }
    const response = await this.api.repos.repoGetPullReviewComments(
      this.owner,
      this.repoName,
      index,
      id
    );
    return response.data;
  }

  // Submit a pending review to an pull request
  async submitPendingPullReview(
    id: number,
    body: SubmitPullReviewOptions,
    index = this.index
  ) {
    if (!index) {
      throw new Error(`PR is missing or has no index`);
    }
    const response = await this.api.repos.repoSubmitPullReview(
      this.owner,
      this.repoName,
      index,
      id,
      body
    );
    const notification = {
      ...this.repoData,
      index,
      id,
      body,
    };
    await this.notify("repo:pull_review:submit:pending", notification);
    return response.data;
  }

  async dismissPullReview(
    id: number,
    body: DismissPullReviewOptions,
    index = this.index
  ) {
    if (!index) {
      throw new Error(`PR is missing or has no index`);
    }
    const response = await this.api.repos.repoDismissPullReview(
      this.owner,
      this.repoName,
      index,
      id,
      body
    );
    const notification = {
      ...this.repoData,
      index,
      id,
      body,
    };
    await this.notify("repo:pull_review:dismiss", notification);
    return response.data;
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
