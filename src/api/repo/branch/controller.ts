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
    const label = "repo:branch:delete";
    const response = await this.api.repos.repoDeleteBranch(
      this.owner,
      this.repoName,
      branchName
    );
    return await this.notifyAndReturn<any>({ label, response }, branchName);
  }

  async list() {
    const label = "repo:branch:list";
    const returnVal: any[] = [];
    const response = await this.api.repos.repoListBranches(
      this.owner,
      this.repoName
    );
    return await this.notifyAndReturn<Branch[], any>({
      label,
      returnVal,
      response,
    });
  }

  async getByName(branchName: string) {
    const label = "repo:branch:get";
    const response = await this.api.repos.repoGetBranch(
      this.owner,
      this.repoName,
      branchName
    );
    return await this.notifyAndReturn<Branch, any>(
      {
        label,
        response,
      },
      branchName
    );
  }
}
