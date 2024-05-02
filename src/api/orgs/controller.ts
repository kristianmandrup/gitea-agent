import {
  CreateOrgOption,
  CreateTeamOption,
  Organization,
  Team,
  User,
} from "gitea-js";
import { GiteaMainAccessor } from "../main-accesser";
import { IMainController } from "../main";
import { IOrgTeamController, OrgTeamController } from "./teams/controller";

export interface IOrgController {
  organization?: Organization;
  username?: string;
  teams: IOrgTeamController;
  setOrganization(organization: Organization): IOrgController;
  create(username: string, opts: CreateOrgOption): Promise<Organization>;
  getByName(name: string): Promise<Organization>;
  delete(name: string): Promise<any>;
  // getTeam(teamId: number): Promise<Team>;
  // listMembers(): Promise<User[]>;
  // createTeam(teamName: string, opts?: CreateTeamOption): Promise<Team>;
  // listTeams(): Promise<Team[]>;
}

export abstract class OrgAccessor extends GiteaMainAccessor {
  organization?: Organization;
  username?: string;
  teams: IOrgTeamController;

  constructor(main: IMainController, organization?: Organization) {
    super(main);
    this.organization = organization;
    this.teams = this.createTeamController();
  }

  protected createTeamController() {
    return new OrgTeamController(this.main);
  }

  get name() {
    return this.organization?.name;
  }

  get id() {
    return this.organization?.id;
  }

  setOrganization(organization: Organization) {
    this.organization = organization;
    return this;
  }

  setUsername(username: string) {
    this.username = username;
    return this;
  }
}

export class GiteaOrgController extends OrgAccessor {
  async create(username: string, opts: CreateOrgOption) {
    const fullOpts = {
      ...opts,
      username,
    };
    const response = await this.api.orgs.orgCreate(fullOpts);
    return response.data;
  }

  async getByName(name = this.name) {
    if (!name) {
      throw new Error("Missing org name");
    }
    const response = await this.api.orgs.orgGet(name);
    return response.data;
  }

  async delete(name = this.name) {
    if (!name) {
      throw new Error("Missing org name");
    }
    const response = await this.api.orgs.orgDelete(name);
    return response.data;
  }

  // orgAddTeamMember: (id: number, username: string
  // orgRemoveTeamMember: (id: number, username: string
  // orgListRepos: (org: string, query?
  // orgListTeamRepos: (id: number
  // orgListTeamRepo: (id: number, org: string, repo: string
  // orgAddTeamRepository: (id: number, org: string, repo: string
  // orgRemoveTeamRepository: (id: number, org: string, repo: string
}
