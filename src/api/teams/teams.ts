import { Repository, Team } from "gitea-js";
import { GiteaMainAccessor } from "../main-accesser";
import { IMainController } from "../main";

export interface ITeamController {
  team?: Team;
  setTeam(team: Team): this;
  deleteTeam(): Promise<void>;
  deleteTeamMember(username: string): Promise<any>;
  addTeamMember(username: string): Promise<any>;
  getTeamRepos(): Promise<Repository[]>;
  getTeam(id: number): Promise<Team>;
  listTeamMembers(): Promise<any[]>;
}

export class GiteaTeamController
  extends GiteaMainAccessor
  implements ITeamController
{
  team?: Team;

  constructor(main: IMainController, team?: Team) {
    super(main);
    this.team = team;
  }

  get id() {
    return this.team?.id;
  }

  setTeam(team: Team) {
    this.team = team;
    return this;
  }

  async deleteTeam() {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgDeleteTeam(this.id);
    return response.data;
  }

  async deleteTeamMember(username: string) {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgRemoveTeamMember(
      this.id,
      username
    );
    return response.data;
  }

  async addTeamMember(username: string) {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgAddTeamMember(this.id, username);
    return response.data;
  }

  async getTeamRepos() {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgListTeamRepos(this.id);
    return response.data;
  }

  async getTeam(id: number) {
    const response = await this.api.teams.orgGetTeam(id);
    return response.data;
  }

  async listTeamMembers() {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgListTeamMembers(this.id);
    return response.data;
  }
}
