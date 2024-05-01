import axios from "axios";
import { RepoAccessor } from "../repo-accesser";
import {
  ChangedFile,
  Commit,
  CreatePullRequestOption,
  MergePullRequestOption,
  PullRequest,
} from "gitea-js";
import { IRepoController } from "../repository/controller";
import {
  GiteaPullRequestReviewController,
  IPullRequestReviewController,
} from "./pr-reviews/controller";

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
  delete(index: number): Promise<void>;
  getSingle(index: number): Promise<PullRequest>;
  isMerged(index: number): Promise<boolean>;
  list(): Promise<PullRequest[]>;
  getFiles(index?: number): Promise<ChangedFile[]>;
  merge(
    index: number,
    mergeType?: MergeType,
    opts?: MergePullRequestOpts
  ): Promise<any>;
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
    const response = await this.api.repos.repoCreatePullRequest(
      this.owner,
      this.repoName,
      opts
    );
    const notification = {
      ...this.repoData,
      ...opts,
    };
    await this.notify("repo:pull_request", notification);
    return response.data;
  }

  async getSingle(index = this.index) {
    if (!index) {
      throw new Error("Missing PR identification number");
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
  async update(style: MergeStyle = "merge", index = this.index) {
    if (!index) {
      throw new Error("Missing PR identification number");
    }
    const response = await this.api.repos.repoUpdatePullRequest(
      this.owner,
      this.repoName,
      index,
      {
        style,
      }
    );
    return response.data;
  }

  async list() {
    const response = await this.api.repos.repoListPullRequests(
      this.owner,
      this.repoName
    );
    return response.data;
  }

  async isMerged(index = this.index) {
    if (!index) {
      throw new Error("Missing PR id number");
    }
    try {
      const response = await this.api.repos.repoPullRequestIsMerged(
        this.owner,
        this.repoName,
        index
      );
      const pullRequest = response.data as any;
      return pullRequest.merged === true;
    } catch (error) {
      // TODO: fix
      // this.handleError("Error fetching pull request:", error);
      return false;
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
    return response.data;
  }

  async delete(index = this.index) {
    const baseUrl = this.api.baseUrl;
    const { owner, repoName } = this;
    const apiUrl = `https://${baseUrl}/api/v1/repos/${owner}/${repoName}/pulls/${index}`;
    axios
      .delete(apiUrl)
      .then((response) => {
        console.log(
          `Pull request ${index} closed successfully.`,
          response.data
        );
      })
      .catch((error) => {
        console.error(`Error closing pull request ${index}:`, error);
      });
  }

  // Get commits for the PR
  async getCommits(index = this.index): Promise<Commit[]> {
    if (!index) {
      throw new Error("Missing PR index");
    }
    const response = await this.api.repos.repoGetPullRequestCommits(
      this.owner,
      this.repoName,
      index
    );
    return response.data;
  }

  // Get changed files for a pull request
  async getFiles(index = this.index): Promise<ChangedFile[]> {
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
