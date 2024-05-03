import { MainActionHandler } from "./action-handler";
import { Action, CompositeActionHandler, IActionHandler } from "./actions";
import { GiteaAdminController, IAdminController } from "./admin";
import { GiteaApi, GiteaApiAccessor } from "./api";
import { IMainNotifier, MainNotifier } from "./notifier";
import { GiteaOrgController, IOrgController } from "./orgs";
import { GiteaRepositoryController, IRepoController } from "./repo";
import { GiteaTeamController, ITeamController } from "./teams";
import { GiteaUserController, IUserController } from "./users";

export interface IMainController {
  gitea: GiteaApi;
  admin: IAdminController;
  orgs: IOrgController;
  teams: ITeamController;
  users: IUserController;
  repos: IRepoController;
  notifier: IMainNotifier;

  handle(action: Action): Promise<void>;
  notify(label: string, data: any): void;
  notifyError(label: string, data: any): void;
}

export type RepoMap = Record<string, IRepoController>;

export class GiteaMainController extends GiteaApiAccessor {
  admin: IAdminController;
  orgs: IOrgController;
  teams: ITeamController;
  users: IUserController;
  actionHandler: CompositeActionHandler;
  notifier: IMainNotifier;

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
    this.actionHandler = this.createActionHandler();
    this.notifier = this.createNotifier();
  }

  createNotifier() {
    return new MainNotifier(this);
  }

  notify(label: string, data: any) {
    this.notifier.notify(label, data);
  }

  notifyError(label: string, data: any) {
    this.notifier.notifyError(label, data);
  }

  async handle(action: Action) {
    return await this.actionHandler.handle(action);
  }

  get definitions() {
    return this.actionHandler.definitions;
  }

  registerHandler(handler: IActionHandler) {
    this.actionHandler.registerHandler(handler);
  }

  createActionHandler() {
    return new MainActionHandler(this);
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
