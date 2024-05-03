import {
  Branch,
  BranchProtection,
  CreateBranchProtectionOption,
} from "gitea-js";
import { RepoBaseController } from "../repo-base-controller";

export interface IBranchController {
  create(branchName: string): Promise<Branch | undefined>;
  createProtection(
    branchName: string,
    opts: CreateBranchProtectionOption
  ): Promise<BranchProtection | undefined>;
  delete(branchName: string): Promise<any>;
  list(): Promise<Branch[]>;
  getByName(branchName: string): Promise<Branch | undefined>;
}

export class GiteaBranchController
  extends RepoBaseController
  implements IBranchController
{
  $api = this.api.repos;

  get coreData() {
    return this.repoData;
  }

  async create(branchName: string) {
    const label = "repo:branch:create";
    try {
      const response = await this.$api.repoCreateBranch(
        this.owner,
        this.repoName,
        {
          new_branch_name: branchName,
        }
      );
      return this.notifyAndReturn<Branch>(
        {
          label,
          response,
        },
        branchName
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, branchName);
    }
  }

  async createProtection(
    branchName: string,
    opts?: CreateBranchProtectionOption
  ) {
    const label = "repo:branch:protection:create";
    const fullOpts = {
      ...(opts || {}),
      branch_name: branchName,
    };
    const returnVal: any[] = [];
    try {
      const response = await this.api.repos.repoCreateBranchProtection(
        this.owner,
        this.repoName,
        fullOpts
      );
      return await this.notifyAndReturn<BranchProtection>(
        { label, returnVal, response },
        branchName
      );
    } catch (error) {
      return await this.notifyErrorAndReturn(
        { label, returnVal, error },
        branchName
      );
    }
  }

  // repoEditBranchProtection: (owner: string, repo: string, name: string, body: EditBranchProtectionOption
  // repoDeleteBranchProtection: (owner: string, repo: string, name: string
  // repoListBranchProtection: (owner: string, repo: string

  async delete(branchName: string) {
    const response = await this.api.repos.repoDeleteBranch(
      this.owner,
      this.repoName,
      branchName
    );
    const notification = {
      ...this.repoData,
      branchName,
    };
    this.enrich(notification, response);
    await this.notify("repo:branch:delete", notification);
    return this.returnData<any>(response);
  }

  async list() {
    const response = await this.api.repos.repoListBranches(
      this.owner,
      this.repoName
    );
    const notification = {
      ...this.repoData,
    };
    this.enrich(notification, response);
    await this.notify("repo:branch:list", notification);
    return this.returnData<Branch[], any>(response, []);
  }

  async getByName(branchName: string) {
    const response = await this.api.repos.repoGetBranch(
      this.owner,
      this.repoName,
      branchName
    );
    const notification = {
      ...this.repoData,
    };
    this.enrich(notification, response);
    await this.notify("repo:branch:get", notification);
    return this.returnData<Branch, unknown>(response);
  }
}
