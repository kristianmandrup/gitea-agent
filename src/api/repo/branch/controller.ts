import {
  Branch,
  BranchProtection,
  CreateBranchProtectionOption,
} from "gitea-js";
import { RepoAccessor } from "../repo-accesser";

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
  extends RepoAccessor
  implements IBranchController
{
  async create(branchName: string) {
    const response = await this.api.repos.repoCreateBranch(
      this.owner,
      this.repoName,
      {
        new_branch_name: branchName,
      }
    );
    const notification = {
      ...this.repoData,
      branchName,
    };
    await this.notify("repo:branch:create", notification);
    return response.data;
  }

  async createProtection(
    branchName: string,
    opts?: CreateBranchProtectionOption
  ) {
    const fullOpts = {
      ...(opts || {}),
      branch_name: branchName,
    };
    const response = await this.api.repos.repoCreateBranchProtection(
      this.owner,
      this.repoName,
      fullOpts
    );
    const notification = {
      ...this.repoData,
      ...fullOpts,
    };
    await this.notify("repo:branch:protection:create", notification);
    return response.data;
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
    await this.notify("repo:branch:delete", notification);
    return response.data;
  }

  async list() {
    const response = await this.api.repos.repoListBranches(
      this.owner,
      this.repoName
    );
    return response.data;
  }

  async getByName(branchName: string) {
    const response = await this.api.repos.repoGetBranch(
      this.owner,
      this.repoName,
      branchName
    );
    return response.data;
  }
}
