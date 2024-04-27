import {
  Branch,
  BranchProtection,
  CreateBranchProtectionOption,
} from "gitea-js";
import { RepoAccessor } from "./repo-accesser";

export interface IBranchController {
  createBranch(branchName: string): Promise<Branch>;
  createBranchProtection(
    branchName: string,
    opts: CreateBranchProtectionOption
  ): Promise<BranchProtection>;
  deleteBranch(branchName: string): Promise<any>;
  listBranches(): Promise<Branch[]>;
  getBranch(branchName: string): Promise<Branch>;
}

export class GiteaBranchController extends RepoAccessor {
  async createBranch(branchName: string) {
    const response = await this.api.repos.repoCreateBranch(
      this.owner,
      this.repoName,
      {
        new_branch_name: branchName,
      }
    );
    return response.data;
  }

  async createBranchProtection(
    branchName: string,
    opts: CreateBranchProtectionOption
  ) {
    opts.branch_name = opts.branch_name || branchName;
    const response = await this.api.repos.repoCreateBranchProtection(
      this.owner,
      this.repoName,
      opts
    );
    return response.data;
  }

  async deleteBranch(branchName: string) {
    const response = await this.api.repos.repoDeleteBranch(
      this.owner,
      this.repoName,
      branchName
    );
    return response.data;
  }

  async listBranches() {
    const response = await this.api.repos.repoListBranches(
      this.owner,
      this.repoName
    );
    return response.data;
  }

  async getBranch(branchName: string) {
    const response = await this.api.repos.repoGetBranch(
      this.owner,
      this.repoName,
      branchName
    );
    return response.data;
  }
}
