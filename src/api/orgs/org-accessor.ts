import { Organization } from "gitea-js";
import { GiteaMainAccessor } from "../main-accesser";
import { IMainController } from "../main";
import { IOrgTeamController, OrgTeamController } from "./teams/controller";
import {
  IOrganizationMemberController,
  OrgMemberController,
} from "./members/controller";

export abstract class OrgAccessor extends GiteaMainAccessor {
  organization?: Organization;
  username?: string;
  teams: IOrgTeamController;
  members: IOrganizationMemberController;

  constructor(main: IMainController, organization?: Organization) {
    super(main);
    this.organization = organization;
    this.teams = this.createTeamController();
    this.members = this.createMembersController();
  }

  protected createMembersController() {
    return new OrgMemberController(this.main);
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
