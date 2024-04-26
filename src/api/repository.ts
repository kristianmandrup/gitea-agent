import { GiteaApi, api } from "./api";
import { Repository } from "gitea-js";
import {
  GiteaCollaboratorController,
  ICollaboratorController,
} from "./collaborator";
import { GiteaBranchController, IBranchController } from "./branch";
import {
  GiteaPullRequestController,
  IPullRequestController,
} from "./pull-request";
import { GiteaTeamController, ITeamController } from "./team";
import { GiteaTopicController, ITopicController } from "./topic";
import { GiteaIssueController, IIssueController } from "./issue";

export class GiteaRepositoryController {
  gitea: GiteaApi;
  owner: string;
  name: string;
  repository?: Repository;
  collaborators: ICollaboratorController;
  branches: IBranchController;
  pullRequests: IPullRequestController;
  teams: ITeamController;
  topics: ITopicController;
  issues: IIssueController;

  constructor(owner: string, name: string) {
    this.owner = owner;
    this.name = name;
    this.gitea = api;
    this.collaborators = this.createCollaboratorController();
    this.branches = this.createBranchController();
    this.pullRequests = this.createPullRequestController();
    this.teams = this.createTeamController();
    this.topics = this.createTopicController();
    this.issues = this.createIssueController();
  }

  createIssueController() {
    return new GiteaIssueController(this);
  }

  createTopicController() {
    return new GiteaTopicController(this);
  }

  createTeamController() {
    return new GiteaTeamController(this);
  }

  createPullRequestController() {
    return new GiteaPullRequestController(this);
  }

  protected createBranchController() {
    return new GiteaBranchController(this);
  }

  protected createCollaboratorController() {
    return new GiteaCollaboratorController(this);
  }

  get api() {
    return this.gitea.api;
  }

  async getRepo() {
    const response = await this.api.repos.repoGet(this.owner, this.name);
    this.repository = response.data;
  }
}
