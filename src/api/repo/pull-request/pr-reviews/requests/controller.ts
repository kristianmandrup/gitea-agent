import { PullRequest, PullReview, PullReviewRequestOptions } from "gitea-js";
import { IRepoAccessor, RepoAccessor } from "../../../repo-accesser";
import { IPullRequestReviewController } from "../controller";

export interface IReviewRequestController extends IRepoAccessor {
  createRequests(
    opts: PullReviewRequestOptions,
    index?: number
  ): Promise<PullReview[]>;
  cancelRequests(
    opts: PullReviewRequestOptions,
    index?: number
  ): Promise<PullReview[]>;
  setPullRequestId(id: number): void;
  setPullRequest(pr: PullRequest): void;
}

export class GiteaReviewRequestController
  extends RepoAccessor
  implements IReviewRequestController
{
  pr?: PullRequest;
  id?: number;
  prController: IPullRequestReviewController;

  constructor(controller: IPullRequestReviewController) {
    super(controller.repo);
    this.prController = controller;
  }

  get index() {
    return this.prController.pr?.id || this.prController.id;
  }

  setPullRequest(pr: PullRequest) {
    this.prController.setPullRequest(pr);
  }

  setPullRequestId(id: number) {
    this.prController.id = id;
  }

  async createRequests(opts: PullReviewRequestOptions) {
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

  async cancelRequests(opts: PullReviewRequestOptions) {
    if (!this.index) {
      throw new Error(`PR is missing or has no index`);
    }
    const response = await this.api.repos.repoDeletePullReviewRequests(
      this.owner,
      this.repoName,
      this.index,
      opts
    );
    return response.data;
  }
}
