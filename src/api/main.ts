import { GiteaAdminController, IAdminController } from "./admin";
import { GiteaApi, GiteaApiAccessor } from "./api";
import { GiteaOrgController, IOrgController } from "./orgs";
import { GiteaRepositoryController, IRepoController } from "./repo";
import { GiteaTeamController, ITeamController } from "./teams";
import { GiteaUserController, IUserController } from "./users";

export interface IMainController {
  gitea: GiteaApi;
}

export type RepoMap = Record<string, IRepoController>;

export class GiteaMainController extends GiteaApiAccessor {
  admin: IAdminController;
  orgs: IOrgController;
  teams: ITeamController;
  users: IUserController;

  // repos
  owners: Record<string, RepoMap> = {};
  activeOwner?: string;
  activeRepo?: string;

  constructor() {
    super();
    this.admin = this.createAdminController();
    this.orgs = this.createOrgController();
    this.teams = this.createTeamsController();
    this.users = this.createUsersController();
  }

  createUsersController() {
    return new GiteaUserController(this);
  }

  createTeamsController() {
    return new GiteaTeamController(this);
  }

  get repos() {
    return this.getRepoController();
  }

  getRepoController(owner?: string, name?: string) {
    const ownerName = owner || this.activeOwner;
    if (!ownerName) {
      throw new Error("Missing repo owner");
    }
    const repoMap = this.owners[ownerName] || {};
    const repoName = name || this.activeRepo;
    if (!repoName) {
      throw new Error("Missing repo name");
    }
    return repoMap[repoName];
  }

  addRepoController(owner: string, name: string) {
    this.owners[owner] = this.owners[owner] || {};
    const reposMap = this.owners[owner];
    reposMap[name] = reposMap[name] || this.createRepoController(owner, name);
    return this;
  }

  createRepoController(owner: string, name: string) {
    return new GiteaRepositoryController(this, owner, name);
  }

  createOrgController() {
    return new GiteaOrgController(this);
  }

  createAdminController() {
    return new GiteaAdminController(this);
  }
}
