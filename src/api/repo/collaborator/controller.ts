import { User } from "gitea-js";
import { RepoAccessor } from "../repo-accesser";

export interface ICollaboratorController {
  list(): Promise<User[]>;
  add(id?: string): Promise<any>;
  delete(id?: string): Promise<any>;
  check(id?: string): Promise<any>;
}

export class GiteaCollaboratorController
  extends RepoAccessor
  implements ICollaboratorController
{
  id?: string;

  setId(id: string) {
    this.id = id;
    return this;
  }

  // Check if a user is a collaborator of a repository
  public async check(id = this.id) {
    if (!id) {
      throw new Error("Missing collaborator id");
    }
    const response = await this.api.repos.repoCheckCollaborator(
      this.owner,
      this.repoName,
      id
    );
    return response.data;
  }

  public async list() {
    const response = await this.api.repos.repoListCollaborators(
      this.owner,
      this.repoName
    );
    return response.data;
  }

  public async add(newId: string) {
    const response = await this.api.repos.repoAddCollaborator(
      this.owner,
      this.repoName,
      newId,
      {
        permission: "write",
      }
    );
    return response.data;
  }

  public async delete(id = this.id) {
    if (!id) {
      throw new Error("Missing collaborator id");
    }
    const response = await this.api.repos.repoDeleteCollaborator(
      this.owner,
      this.repoName,
      id
    );
    return response.data;
  }
}
