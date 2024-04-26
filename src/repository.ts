import { AxiosResponse } from "axios";
import { GiteaApi, api } from "./api";
import { Repository } from "gitea-js";

export type Collaborator = {
  active: boolean;
  avatar_url: string;
  created: string;
  description: string;
  email: string;
  followers_count: number;
  following_count: number;
  full_name: string;
  id: number;
  is_admin: boolean;
  language: string;
  last_login: string;
  location: string;
  login: string;
  login_name: string;
  prohibit_login: boolean;
  restricted: boolean;
  starred_repos_count: number;
  visibility: string;
  website: string;
};

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

  async getCollaborators() {
    const response = await this.api.repos.repoListCollaborators(
      this.owner,
      this.name
    );
    return await response.data;
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
    return await response.data;
  }
}
