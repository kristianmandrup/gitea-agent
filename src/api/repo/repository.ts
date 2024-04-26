import { GiteaApi, GiteaApiAccesser, api } from "../api";
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
import { GiteaRepoTeamController, ITeamController } from "./team";
import { GiteaRepoTopicController, ITopicController } from "./topic";
import { GiteaRepoIssueController, IIssueController } from "./issue";

export class GiteaRepositoryController extends GiteaApiAccesser {
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
    super();
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
    return new GiteaRepoIssueController(this);
  }

  createTopicController() {
    return new GiteaRepoTopicController(this);
  }

  createTeamController() {
    return new GiteaRepoTeamController(this);
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

  async getRepo() {
    const response = await this.api.repos.repoGet(this.owner, this.name);
    this.repository = response.data;
  }
}
