import { User } from "gitea-js";
import { RepoAccessor } from "./repo-accesser";

export interface ICollaboratorController {
  getCollaborators(): Promise<User[]>;
  addCollaborator(collaboratorId: string): Promise<any>;
  deleteCollaborator(collaboratorId: string): Promise<any>;
}

export class GiteaCollaboratorController
  extends RepoAccessor
  implements ICollaboratorController
{
  public async getCollaborators() {
    const response = await this.api.repos.repoListCollaborators(
      this.owner,
      this.repoName
    );
    return response.data;
  }

  public async addCollaborator(collaboratorId: string) {
    const response = await this.api.repos.repoAddCollaborator(
      this.owner,
      this.repoName,
      collaboratorId,
      {
        permission: "write",
      }
    );
    return response.data;
  }

  public async deleteCollaborator(collaboratorId: string) {
    const response = await this.api.repos.repoDeleteCollaborator(
      this.owner,
      this.repoName,
      collaboratorId
    );
    return response.data;
  }
}
