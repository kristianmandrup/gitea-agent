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
import { RepoBaseController } from "../../repo-base-controller";

export interface IPullRequestReviewController {
  pr?: PullRequest;
  id?: number;
  controller: IRepoController;
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
  extends RepoBaseController
  implements IPullRequestReviewController
{
  baseLabel = "repo:pull_requests:reviews";

  pr?: PullRequest;
  id?: number;
  requests: IReviewRequestController;

  constructor(controller: IRepoController) {
    super(controller);
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
    const label = this.labelFor("list");
    const data = { index };
    try {
      const response = await this.api.repos.repoListPullReviews(
        this.owner,
        this.repoName,
        index
      );
      return await this.notifyAndReturn<PullReview[]>(
        {
          label,
          response,
          returnVal: [],
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async getById(id: number, index = this.index) {
    if (!index) {
      throw new Error(`PR is missing or has no index`);
    }
    const label = this.labelFor("get:by_id");
    const data = { id, index };
    try {
      const response = await this.api.repos.repoGetPullReview(
        this.owner,
        this.repoName,
        index,
        id
      );
      return await this.notifyAndReturn<PullReview>(
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

  async delete(reviewId: number, index = this.index) {
    if (!index) {
      throw new Error(`PR is missing or has no index`);
    }
    const label = this.labelFor("delete");
    const data = { reviewId, index };
    try {
      const response = await this.api.repos.repoDeletePullReview(
        this.owner,
        this.repoName,
        index,
        reviewId
      );
      return await this.notifyAndReturn<any>(
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

  async getComments(id: number, index = this.index) {
    if (!index) {
      throw new Error(`PR is missing or has no index`);
    }
    const label = this.labelFor("delete");
    const data = { id, index };
    try {
      const response = await this.api.repos.repoGetPullReviewComments(
        this.owner,
        this.repoName,
        index,
        id
      );
      return await this.notifyAndReturn<PullReviewComment[]>(
        {
          label,
          response,
          returnVal: [],
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
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
    const label = "submit:pending";
    const data = { id, ...opts, index };
    try {
      const response = await this.api.repos.repoSubmitPullReview(
        this.owner,
        this.repoName,
        index,
        id,
        opts
      );
      return await this.notifyAndReturn<PullReview>(
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

  async dismiss(
    id: number,
    opts: DismissPullReviewOptions,
    index = this.index
  ) {
    if (!index) {
      throw new Error(`PR is missing or has no index`);
    }
    const label = "dismiss";
    const data = { id, ...opts, index };
    try {
      const response = await this.api.repos.repoDismissPullReview(
        this.owner,
        this.repoName,
        index,
        id,
        opts
      );
      return await this.notifyAndReturn<PullReview>(
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
}
