import {
  CreatePullReviewOptions,
  DismissPullReviewOptions,
  PullRequest,
  PullReview,
  PullReviewComment,
  PullReviewRequestOptions,
  SubmitPullReviewOptions,
} from "gitea-js";
import { IRepoAccessor, RepoAccessor } from "../../repo-accesser";
import { IRepoController } from "../../repository/controller";
import {
  GiteaReviewRequestController,
  IReviewRequestController,
} from "./requests/controller";

export interface IPullRequestReviewController extends IRepoAccessor {
  pr?: PullRequest;
  id?: number;
  create(opts: CreatePullReviewOptions): Promise<PullReview>;
  delete(id: number, index?: number): Promise<any>;
  list(index?: number): Promise<PullReview[]>;
  getById(id: number, index?: number): Promise<PullReview>;
  getComments(id: number, index?: number): Promise<PullReviewComment[]>;
  submitPending(
    id: number,
    opts: SubmitPullReviewOptions,
    index?: number
  ): Promise<any>;
  dismiss(
    id: number,
    body: DismissPullReviewOptions,
    index?: number
  ): Promise<any>;
  setPullRequestId(id: number): void;
  setPullRequest(pr: PullRequest): void;
  requests: IReviewRequestController;
}

export class GiteaPullRequestReviewController
  extends RepoAccessor
  implements IPullRequestReviewController
{
  pr?: PullRequest;
  id?: number;
  requests: IReviewRequestController;

  constructor(repo: IRepoController) {
    super(repo);
    this.requests = this.createReviewRequestController();
  }

  protected createReviewRequestController() {
    return new GiteaReviewRequestController(this);
  }

  get index() {
    return this.pr?.id || this.id;
  }

  setPullRequest(pr: PullRequest) {
    this.pr = pr;
  }

  setPullRequestId(id: number) {
    this.id = id;
  }

  async create(opts: CreatePullReviewOptions) {
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

  async list(index = this.index) {
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

  async getById(id: number, index = this.index) {
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

  async delete(reviewId: number, index = this.index) {
    if (!index) {
      throw new Error(`PR is missing or has no index`);
    }
    const response = await this.api.repos.repoDeletePullReview(
      this.owner,
      this.repoName,
      index,
      reviewId
    );
    return response.data;
  }

  async getComments(id: number, index = this.index) {
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
  async submitPending(
    id: number,
    opts: SubmitPullReviewOptions,
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
      opts
    );
    const notification = {
      ...this.repoData,
      index,
      id,
      opts,
    };
    await this.notify("repo:pull_review:submit:pending", notification);
    return response.data;
  }

  async dismiss(
    id: number,
    opts: DismissPullReviewOptions,
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
      opts
    );
    const notification = {
      ...this.repoData,
      index,
      id,
      opts,
    };
    await this.notify("repo:pull_review:dismiss", notification);
    return response.data;
  }
}
