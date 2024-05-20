import { User } from "gitea-js";
import { OrgAccessor } from "../org-accessor";

export interface IOrganizationMemberController {
  delete(username?: string): Promise<void>;
  isMember(username?: string): Promise<void>;
  list(): Promise<User[]>;
}
export class OrgMemberController extends OrgAccessor {
  async delete(username = this.username) {
    if (!username) {
      throw new Error("Missing username");
    }
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const response = await this.api.orgs.orgDeleteMember(this.name, username);
    return response.data;
  }

  async isMember(username = this.username) {
    if (!username) {
      throw new Error("Missing username");
    }
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const response = await this.api.orgs.orgIsMember(this.name, username);
    return response.data;
  }

  async list() {
    if (!this.name) {
      throw new Error("Missing organization name");
    }
    const response = await this.api.orgs.orgListMembers(this.name);
    return response.data;
  }
}
