import { EditTeamOption, Repository, Team, User } from "gitea-js";
import { GiteaMainAccessor } from "../main-accesser";
import { IMainController } from "../main";
import {
  GiteaTeamMemberController,
  ITeamMemberController,
} from "./members/controller";
import {
  GiteaTeamReposController,
  ITeamReposController,
} from "./repos/controller";

export interface ITeamController {
  team?: Team;
  teamId?: number;
  members: ITeamMemberController;
  repos: ITeamReposController;
  setTeam(team: Team): this;
  setId(teamId: number): this;
  edit(teamName: string, opts: EditTeamOption, teamId?: number): Promise<Team>;
  delete(id?: number): Promise<void>;
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
  members: ITeamMemberController;
  repos: ITeamReposController;

  baseLabel = "teams";

  constructor(main: IMainController, team?: Team) {
    super(main);
    this.team = team;
    this.members = this.createTeamMemberController();
    this.repos = this.createTeamRepoController();
  }

  protected createTeamRepoController() {
    return new GiteaTeamReposController(this.main);
  }

  protected createTeamMemberController() {
    return new GiteaTeamMemberController(this.main);
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

  async edit(name: string, opts: EditTeamOption, id = this.team?.id) {
    if (!id) {
      throw new Error("Missing team id");
    }
    const fullOpts = {
      ...(opts || {}),
      name: name,
    };
    const label = this.labelFor("teams:edit");
    const data = { name };
    try {
      const response = await this.api.teams.orgEditTeam(id, fullOpts);
      return await this.notifyAndReturn<Team>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async delete(id = this.id) {
    if (!id) {
      throw new Error("Team is missing id");
    }
    const label = this.labelFor("teams:delete");
    const data = { id };
    try {
      const response = await this.api.teams.orgDeleteTeam(id);
      return await this.notifyAndReturn<void>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async deleteMember(username: string) {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const label = this.labelFor("members:delete");
    const data = { username };
    try {
      const response = await this.api.teams.orgRemoveTeamMember(
        this.id,
        username
      );
      return await this.notifyAndReturn<any>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async addMember(username: string) {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const label = this.labelFor("members:add");
    const data = { username };
    try {
      const response = await this.api.teams.orgAddTeamMember(this.id, username);
      return await this.notifyAndReturn<any>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async listRepos() {
    if (!this.id) {
      throw new Error("Team is missing id");
    }
    const label = this.labelFor("repos:list");
    const data = {};
    try {
      const response = await this.api.teams.orgListTeamRepos(this.id);
      return await this.notifyAndReturn<Repository[]>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async getById(id = this.id) {
    if (!id) {
      throw new Error("Team is missing id");
    }
    const label = this.labelFor("get");
    const data = { id };
    try {
      const response = await this.api.teams.orgGetTeam(id);
      return await this.notifyAndReturn<Team>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async listMembers(id = this.id) {
    if (!id) {
      throw new Error("Team is missing id");
    }
    const label = this.labelFor("members:list");
    const data = { id };
    try {
      const response = await this.api.teams.orgListTeamMembers(id);
      return await this.notifyAndReturn<User[]>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }
}
