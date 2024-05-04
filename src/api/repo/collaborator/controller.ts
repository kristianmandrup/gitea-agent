import { User } from "gitea-js";
import { RepoAccessor } from "../repo-accesser";
import { RepoBaseController } from "../repo-base-controller";

export interface ICollaboratorController {
  list(): Promise<User[]>;
  add(id?: string): Promise<any>;
  delete(id?: string): Promise<any>;
  check(id?: string): Promise<any>;
}

export class GiteaCollaboratorController
  extends RepoBaseController
  implements ICollaboratorController
{
  id?: string;
  baseLabel = "repo:collaborator";

  setId(id: string) {
    this.id = id;
    return this;
  }

  // Check if a user is a collaborator of a repository
  public async check(id = this.id) {
    if (!id) {
      throw new Error("Missing collaborator id");
    }
    const label = this.labelFor("check");
    try {
      const response = await this.api.repos.repoCheckCollaborator(
        this.owner,
        this.repoName,
        id
      );
      return await this.notifyAndReturn<any, any>(
        {
          label,
          response,
        },
        id
      );
    } catch (error) {
      return await this.notifyErrorAndReturn(
        {
          label,
          error,
        },
        id
      );
    }
  }

  public async list(query?: any) {
    const label = this.labelFor("list");
    try {
      const response = await this.api.repos.repoListCollaborators(
        this.owner,
        this.repoName
      );
      return await this.notifyAndReturn<any, any>(
        {
          label,
          response,
        },
        query
      );
    } catch (error) {
      return await this.notifyErrorAndReturn(
        {
          label,
          error,
        },
        query
      );
    }
  }

  public async add(newId: string, permission = "write") {
    const label = this.labelFor("add");
    try {
      const response = await this.api.repos.repoAddCollaborator(
        this.owner,
        this.repoName,
        newId,
        {
          permission,
        }
      );
      return await this.notifyAndReturn<any, any>(
        {
          label,
          response,
        },
        newId,
        permission
      );
    } catch (error) {
      return await this.notifyErrorAndReturn(
        {
          label,
          error,
        },
        newId,
        permission
      );
    }
  }

  public async delete(id = this.id) {
    if (!id) {
      throw new Error("Missing collaborator id");
    }
    const label = this.labelFor("delete");
    try {
      const response = await this.api.repos.repoDeleteCollaborator(
        this.owner,
        this.repoName,
        id
      );
      return await this.notifyAndReturn<any, any>(
        {
          label,
          response,
        },
        id
      );
    } catch (error) {
      return await this.notifyErrorAndReturn(
        {
          label,
          error,
        },
        id
      );
    }
  }
}
