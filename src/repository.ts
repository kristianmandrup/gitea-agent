import { GiteaApi, api } from "./api";
import { Repository } from "gitea-js";

export class GiteaRepository {
  gitea: GiteaApi;
  owner: string;
  name: string;
  repository?: Repository;

  constructor(owner: string, name: string) {
    this.owner = owner;
    this.name = name;
    this.gitea = api;
  }

  get api() {
    return this.gitea.api;
  }

  async getRepo() {
    const response = await this.api.repos.repoGet(this.owner, this.name);
    this.repository = response.data;
  }

  async addTopic(topic: string) {
    const response = await this.api.repos.repoAddTopic(
      this.owner,
      this.name,
      topic
    );
    return response.data;
  }

  async createPullRequest(opts: {
    assignees?: string[];
    // labels?: number[];
    title?: string;
    body?: string;
  }) {
    const response = await this.api.repos.repoCreatePullRequest(
      this.owner,
      this.name,
      opts
    );
    return response.data;
  }

  async getPullRequest(index: number) {
    const response = await this.api.repos.repoGetPullRequest(
      this.owner,
      this.name,
      index
    );
    return response.data;
  }

  async listPullRequests() {
    const response = await this.api.repos.repoListPullRequests(
      this.owner,
      this.name
    );
    return response.data;
  }

  async createBranch(branchId: string) {
    const response = await this.api.repos.repoCreateBranch(
      this.owner,
      this.name,
      {
        new_branch_name: branchId,
      }
    );
    return response.data;
  }

  async addTeam(teamId: string) {
    const response = await this.api.repos.repoAddTeam(
      this.owner,
      this.name,
      teamId
    );
    return response.data;
  }

  async getCollaborators() {
    const response = await this.api.repos.repoListCollaborators(
      this.owner,
      this.name
    );
    return response.data;
  }

  async addCollaborator(collaboratorId: string) {
    const response = await this.api.repos.repoAddCollaborator(
      this.owner,
      this.name,
      collaboratorId,
      {
        permission: "write",
      }
    );
    return response.data;
  }

  async deleteCollaborator(collaboratorId: string) {
    const response = await this.api.repos.repoDeleteCollaborator(
      this.owner,
      this.name,
      collaboratorId
    );
    return response.data;
  }
}
