import { Team } from "gitea-js";
import { GiteaApiAccesser } from "../api";

export class GiteaTeamController extends GiteaApiAccesser {
  team: Team;

  constructor(team: Team) {
    super();
    this.team = team;
  }

  get id() {
    return this.team.id;
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
