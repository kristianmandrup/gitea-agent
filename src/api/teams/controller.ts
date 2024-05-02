import { EditTeamOption, Repository, Team } from "gitea-js";
import { GiteaMainAccessor } from "../main-accesser";
import { IMainController } from "../main";

export interface ITeamController {
  team?: Team;
  teamId?: number;
  setTeam(team: Team): this;
  setId(teamId: number): this;
  delete(): Promise<void>;
  deleteMember(username: string): Promise<any>;
  addMember(username: string): Promise<any>;
  listRepos(): Promise<Repository[]>;
  getById(id: number): Promise<Team>;
  listMembers(): Promise<any[]>;
}

export class GiteaTeamController
  extends GiteaMainAccessor
  implements ITeamController
{
  team?: Team;
  teamId?: number;

  constructor(main: IMainController, team?: Team) {
    super(main);
    this.team = team;
  }

  get id() {
    return this.team?.id || this.teamId;
  }

  setTeam(team: Team) {
    this.team = team;
    return this;
  }

  setId(teamId: number) {
    this.teamId = teamId;
    return this;
  }

  async edit(teamName: string, opts: EditTeamOption, teamId = this.team?.id) {
    if (!teamId) {
      throw new Error("Missing team id");
    }
    const fullOpts = {
      ...(opts || {}),
      name: teamName,
    };
    const response = await this.api.teams.orgEditTeam(teamId, fullOpts);
    return response.data;
  }

  async delete() {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgDeleteTeam(this.id);
    return response.data;
  }

  async deleteMember(username: string) {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgRemoveTeamMember(
      this.id,
      username
    );
    return response.data;
  }

  async addMember(username: string) {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgAddTeamMember(this.id, username);
    return response.data;
  }

  async listRepos() {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgListTeamRepos(this.id);
    return response.data;
  }

  async getById(id: number) {
    const response = await this.api.teams.orgGetTeam(id);
    return response.data;
  }

  async listMembers() {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgListTeamMembers(this.id);
    return response.data;
  }
}
