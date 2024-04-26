import { CreateOrgOption, CreateTeamOption, Organization } from "gitea-js";
import { GiteaApiAccesser } from "../api";

export class GiteaOrgController extends GiteaApiAccesser {
  organization: Organization;

  constructor(organization: Organization) {
    super();
    this.organization = organization;
  }

  get name() {
    return this.organization.name;
  }

  get id() {
    return this.organization.id;
  }

  setOrganization(organization: Organization) {
    this.organization = organization;
    return this;
  }

  async createOrganization(username: string, opts: CreateOrgOption) {
    const fullOpts = {
      ...opts,
      username,
    };
    const response = await this.api.orgs.orgCreate(fullOpts);
    return response.data;
  }

  async getTeam(teamId: number) {
    const response = await this.api.teams.orgGetTeam(teamId);
    return response.data;
  }

  async listMembers() {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const response = await this.api.orgs.orgListMembers(this.name);
    return response.data;
  }

  async createTeam(teamName: string, opts?: CreateTeamOption) {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const fullOpts = {
      ...(opts || {}),
      name: teamName,
    };
    const response = await this.api.orgs.orgCreateTeam(this.name, fullOpts);
    return response.data;
  }

  async listTeams() {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const response = await this.api.orgs.orgListTeams(this.name);
    return response.data;
  }
}
