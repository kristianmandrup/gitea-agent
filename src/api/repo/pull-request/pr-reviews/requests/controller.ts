import { PullRequest, PullReview, PullReviewRequestOptions } from "gitea-js";
import { IPullRequestReviewController } from "../controller";
import { RepoBaseController } from "../../../repo-base-controller";
import { IRepoController } from "../../../repository";

export interface IReviewRequestController {
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
  extends RepoBaseController
  implements IReviewRequestController
{
  baseLabel = "repo:pull_requests:review:requests";

  pr?: PullRequest;
  id?: number;
  prController: IPullRequestReviewController;

  constructor(parent: IPullRequestReviewController) {
    super(parent.controller);
    this.prController = parent;
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
    const label = this.labelFor("create");
    const data = { ...opts };
    try {
      const response = await this.api.repos.repoCreatePullReviewRequests(
        this.owner,
        this.repoName,
        this.index,
        opts
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

  async cancelRequests(opts: PullReviewRequestOptions) {
    if (!this.index) {
      throw new Error(`PR is missing or has no index`);
    }
    const label = this.labelFor("cancel");
    const data = { ...opts };
    try {
      const response = await this.api.repos.repoDeletePullReviewRequests(
        this.owner,
        this.repoName,
        this.index,
        opts
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
}
