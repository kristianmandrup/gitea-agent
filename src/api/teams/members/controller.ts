import { Team } from "gitea-js";
import { GiteaMainAccessor } from "../../main-accesser";
import { IMainController } from "../../main";

export interface ITeamMemberController {
  team?: Team;
  teamId?: number;
  setTeam(team: Team): this;
  setId(teamId: number): this;
  delete(username: string): Promise<any>;
  add(username: string): Promise<any>;
  list(): Promise<any[]>;
}

export class GiteaTeamMemberController
  extends GiteaMainAccessor
  implements ITeamMemberController
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

  async delete(username: string) {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgRemoveTeamMember(
      this.id,
      username
    );
    return response.data;
  }

  async add(username: string) {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgAddTeamMember(this.id, username);
    return response.data;
  }

  async list() {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const response = await this.api.teams.orgListTeamMembers(this.id);
    return response.data;
  }
}
