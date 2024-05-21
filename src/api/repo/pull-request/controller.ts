import {
  ChangedFile,
  Commit,
  CreatePullRequestOption,
  PullRequest,
} from "gitea-js";
import { IRepoController } from "../repository/controller";
import {
  GiteaPullRequestReviewController,
  IPullRequestReviewController,
} from "./pr-reviews/controller";
import { RepoBaseController } from "../repo-base-controller";

export type MergePullRequestOpts = {
  MergeCommitID?: string;
  MergeMessageField?: string;
  MergeTitleField?: string;
  delete_branch_after_merge?: boolean;
  force_merge?: boolean;
  head_commit_id?: string;
  merge_when_checks_succeed?: boolean;
};

export type MergeStyle = "merge" | "rebase";
export type MergeType =
  | "merge"
  | "rebase"
  //  | "rebase-merge"
  | "squash";
//  | "manually-merged";

export interface IPullRequestController {
  reviews: IPullRequestReviewController;
  create(opts?: CreatePullRequestOption): Promise<any>;
  update(style?: MergeStyle, index?: number): Promise<PullRequest>;
  getByIndex(index: number): Promise<PullRequest>;
  isMerged(index: number): Promise<boolean>;
  list(query?: any): Promise<PullRequest[]>;
  getFiles(index?: number): Promise<ChangedFile[]>;
  merge(
    index: number,
    mergeType?: MergeType,
    opts?: MergePullRequestOpts
  ): Promise<any>;
}

export class GiteaPullRequestController
  extends RepoBaseController
  implements IPullRequestController
{
  baseLabel = "repo:pull_requests";

  reviews: IPullRequestReviewController;
  index?: number;

  constructor(controller: IRepoController, index?: number) {
    super(controller);
    this.reviews = this.createPullRequestReviewController();
    index && this.setIndex(index);
  }

  setIndex(index: number) {
    this.index = index;
    return this;
  }

  createPullRequestReviewController() {
    return new GiteaPullRequestReviewController(this.controller);
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

  async create(opts: CreatePullRequestOption = {}) {
    const label = this.labelFor("create");
    const data = { ...opts };
    try {
      const response = await this.api.repos.repoCreatePullRequest(
        this.owner,
        this.repoName,
        opts
      );
      return await this.notifyAndReturn<PullRequest>(
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

  async getByIndex(index = this.index) {
    if (!index) {
      throw new Error("Missing PR identification number");
    }
    const label = this.labelFor("get");
    const data = { index };
    try {
      const response = await this.api.repos.repoGetPullRequest(
        this.owner,
        this.repoName,
        index
      );
      return await this.notifyAndReturn<PullRequest>(
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

  // Merge PR's baseBranch into headBranch
  // repoUpdatePullRequest: (owner: string, repo: string, index: number
  async update(style: MergeStyle = "merge", index = this.index) {
    if (!index) {
      throw new Error("Missing PR identification number");
    }
    const label = this.labelFor("create");
    const data = { style, index };
    try {
      const response = await this.api.repos.repoUpdatePullRequest(
        this.owner,
        this.repoName,
        index,
        {
          style,
        }
      );
      return await this.notifyAndReturn<PullRequest>(
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

  async list(query?: any) {
    const label = this.labelFor("create");
    const data = { query };
    try {
      const response = await this.api.repos.repoListPullRequests(
        this.owner,
        this.repoName,
        query
      );
      return await this.notifyAndReturn<PullRequest[]>(
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

  async isMerged(index = this.index) {
    if (!index) {
      throw new Error("Missing PR id number");
    }
    const label = this.labelFor("create");
    const data = { index };
    try {
      const response = await this.api.repos.repoPullRequestIsMerged(
        this.owner,
        this.repoName,
        index
      );
      return await this.notifyAndReturn<PullRequest[]>(
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

  // merge the PR
  async merge(
    index = this.index,
    mergeType: MergeType = "merge",
    opts?: MergePullRequestOpts
  ) {
    if (!index) {
      throw new Error("Missing PR id number");
    }
    const label = this.labelFor("create");
    const data = { index, mergeType, ...opts };
    try {
      const fullOpts = {
        ...(opts || {}),
        Do: mergeType,
      };
      const response = await this.api.repos.repoMergePullRequest(
        this.owner,
        this.repoName,
        index,
        fullOpts
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

  // Get commits for the PR
  async getCommits(index = this.index) {
    if (!index) {
      throw new Error("Missing PR index");
    }
    const label = this.labelFor("commits:list");
    const data = { index };
    try {
      const response = await this.api.repos.repoGetPullRequestCommits(
        this.owner,
        this.repoName,
        index
      );
      return await this.notifyAndReturn<Commit[]>(
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

  // Get changed files for a pull request
  async getFiles(index = this.index) {
    if (!index) {
      throw new Error("Missing PR index");
    }
    const label = this.labelFor("files:list");
    const data = { index };
    try {
      const response = await this.api.repos.repoGetPullRequestFiles(
        this.owner,
        this.repoName,
        index
      );
      return await this.notifyAndReturn<ChangedFile[]>(
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
}
