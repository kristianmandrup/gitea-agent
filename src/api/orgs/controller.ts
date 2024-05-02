import {
  CreateOrgOption,
  CreateTeamOption,
  Organization,
  Team,
  User,
} from "gitea-js";
import { GiteaMainAccessor } from "../main-accesser";
import { IMainController } from "../main";

export interface IOrgController {
  setOrganization(organization: Organization): IOrgController;
  createOrganization(
    username: string,
    opts: CreateOrgOption
  ): Promise<Organization>;
  getTeam(teamId: number): Promise<Team>;
  listMembers(): Promise<User[]>;
  createTeam(teamName: string, opts?: CreateTeamOption): Promise<Team>;
  listTeams(): Promise<Team[]>;
}

export abstract class OrgAccessor extends GiteaMainAccessor {
  organization?: Organization;
  username?: string;

  constructor(main: IMainController, organization?: Organization) {
    super(main);
    this.organization = organization;
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
  async createOrganization(username: string, opts: CreateOrgOption) {
    const fullOpts = {
      ...opts,
      username,
    };
    const response = await this.api.orgs.orgCreate(fullOpts);
    return response.data;
  }

  // orgGet: (org: string
  // orgDelete: (org: string
  // orgAddTeamMember: (id: number, username: string
  // orgRemoveTeamMember: (id: number, username: string
  // orgListRepos: (org: string, query?
  // orgListTeamRepos: (id: number
  // orgListTeamRepo: (id: number, org: string, repo: string
  // orgAddTeamRepository: (id: number, org: string, repo: string
  // orgRemoveTeamRepository: (id: number, org: string, repo: string
}
