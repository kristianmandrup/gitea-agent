import { EditRepoOption, Repository } from "gitea-js";
import {
  GiteaCollaboratorController,
  ICollaboratorController,
} from "./collaborator";
import { GiteaBranchController, IBranchController } from "./branch";
import {
  GiteaPullRequestController,
  IPullRequestController,
} from "./pull-request";
import { GiteaRepoTeamController, IRepoTeamController } from "./team";
import { GiteaRepoTopicController, IRepoTopicController } from "./topic";
import { GiteaRepoIssueController, IRepoIssueController } from "./issue";
import { IMainController } from "../main";
import { GiteaMainAccessor, IMainAccessor } from "../main-accesser";
import { GiteaRepoFilesController, IRepoFilesController } from "./files";

export interface IRepoController extends IMainAccessor {
  owner: string;
  name: string;
  repository?: Repository;
  getRepo(): Promise<Repository>;
  editRepo(opts: EditRepoOption): Promise<Repository>;
  setRepository(repository: Repository): IRepoController;
}

export class GiteaRepositoryController
  extends GiteaMainAccessor
  implements IRepoController
{
  owner: string;
  name: string;
  repository?: Repository;
  collaborators: ICollaboratorController;
  branches: IBranchController;
  pullRequests: IPullRequestController;
  teams: IRepoTeamController;
  topics: IRepoTopicController;
  issues: IRepoIssueController;
  files: IRepoFilesController;

  constructor(main: IMainController, owner: string, name: string) {
    super(main);
    this.owner = owner;
    this.name = name;
    this.collaborators = this.createCollaboratorController();
    this.branches = this.createBranchController();
    this.pullRequests = this.createPullRequestController();
    this.teams = this.createTeamController();
    this.topics = this.createTopicController();
    this.issues = this.createIssueController();
    this.files = this.createFilesController();
  }

  setRepository(repository: Repository) {
    this.repository = repository;
    return this;
  }

  protected createFilesController() {
    return new GiteaRepoFilesController(this);
  }

  protected createIssueController() {
    return new GiteaRepoIssueController(this);
  }

  protected createTopicController() {
    return new GiteaRepoTopicController(this);
  }

  protected createTeamController() {
    return new GiteaRepoTeamController(this);
  }

  protected createPullRequestController() {
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
    return response.data;
  }

  async editRepo(opts: EditRepoOption) {
    const response = await this.api.repos.repoEdit(this.owner, this.name, opts);
    return response.data;
  }

  // getTree: (owner: string, repo: string, sha: string

  // repoGetSingleCommit: (owner: string, repo: string, sha: string

  // repoDelete: (owner: string, repo: string

  // repoGetReviewers: (owner: string, repo: string

  // generateRepo: (templateOwner: string, templateRepo: string, body: GenerateRepoOption
}