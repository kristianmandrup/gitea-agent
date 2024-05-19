import {
  Branch,
  BranchProtection,
  CreateBranchProtectionOption,
} from "gitea-js";
import { RepoBaseController } from "../repo-base-controller";

export interface IBranchController {
  create(branchName: string): Promise<Branch>;
  createProtection(
    branchName: string,
    opts: CreateBranchProtectionOption
  ): Promise<BranchProtection>;
  delete(branchName: string): Promise<any>;
  list(): Promise<Branch[]>;
  getByName(branchName: string): Promise<Branch>;
}

export class GiteaBranchController
  extends RepoBaseController
  implements IBranchController
{
  baseLabel = "repo:branch";

  async create(branchName: string) {
    const label = this.labelFor("create");
    const data = { branchName };
    try {
      const response = await this.$api.repoCreateBranch(
        this.owner,
        this.repoName,
        {
          new_branch_name: branchName,
        }
      );
      return await this.notifyAndReturn<Branch>(
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

  async createProtection(
    branchName: string,
    opts?: CreateBranchProtectionOption
  ) {
    const label = this.labelFor("protection:create");
    const fullOpts = {
      ...(opts || {}),
      branch_name: branchName,
    };
    const data = fullOpts;
    const returnVal: any[] = [];
    try {
      const response = await this.api.repos.repoCreateBranchProtection(
        this.owner,
        this.repoName,
        fullOpts
      );
      return await this.notifyAndReturn<BranchProtection>(
        { label, returnVal, response },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, returnVal, error }, data);
    }
  }

  // repoEditBranchProtection: (owner: string, repo: string, name: string, body: EditBranchProtectionOption
  // repoDeleteBranchProtection: (owner: string, repo: string, name: string
  // repoListBranchProtection: (owner: string, repo: string

  async delete(branchName: string) {
    const label = "repo:branch:delete";
    const data = { branchName };
    try {
      const response = await this.api.repos.repoDeleteBranch(
        this.owner,
        this.repoName,
        branchName
      );
      return await this.notifyAndReturn<any>({ label, response }, data);
    } catch (error) {
      return await this.notifyErrorAndReturn(
        {
          label,
          error,
        },
        data
      );
    }
  }

  async list(query?: any) {
    const label = this.labelFor("list");
    const returnVal: any[] = [];
    const data = { query };
    try {
      const response = await this.$api.repoListBranches(
        this.owner,
        this.repoName,
        query
      );
      return await this.notifyAndReturn<Branch[]>(
        {
          label,
          returnVal,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn(
        {
          label,
          returnVal,
          error,
        },
        data
      );
    }
  }

  async getByName(branchName: string) {
    const label = this.labelFor("get");
    const data = { branchName };
    try {
      const response = await this.$api.repoGetBranch(
        this.owner,
        this.repoName,
        branchName
      );
      return await this.notifyAndReturn<Branch>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn(
        {
          label,
          error,
        },
        data
      );
    }
  }
}
