import { EditRepoOption, GenerateRepoOption, Repository } from "gitea-js";
import {
  GiteaCollaboratorController,
  ICollaboratorController,
} from "../collaborator/controller";
import { GiteaBranchController, IBranchController } from "../branch";
import {
  GiteaPullRequestController,
  IPullRequestController,
} from "../pull-request";
import {
  GiteaRepoTeamController,
  IRepoTeamController,
} from "../team/controller";
import { GiteaRepoTopicController, IRepoTopicController } from "../topic";
import { GiteaRepoIssueController, IRepoIssueController } from "../issue";
import { IMainController } from "../../main";
import { GiteaMainAccessor, IMainAccessor } from "../../main-accesser";
import { GiteaRepoFilesController, IRepoFilesController } from "../files";
import { GiteaRepoCommitsController, IRepoCommitsController } from "../commits";
import {
  GiteaRepoReleaseController,
  IRepoReleaseController,
} from "../releases/controller";

export interface IRepoController extends IMainAccessor {
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
  commits: IRepoCommitsController;
  releases: IRepoReleaseController;

  getRepo(): Promise<Repository>;
  editRepo(opts: EditRepoOption): Promise<Repository>;
  setRepository(repository: Repository): IRepoController;
  generateFromTemplate(
    newName: string,
    opts: GenerateRepoOption,
    owner?: string,
    repoName?: string
  ): Promise<Repository>;
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
  commits: IRepoCommitsController;
  releases: IRepoReleaseController;

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
    this.commits = this.createCommitsController();
    this.releases = this.createReleaseController();
  }

  setRepository(repository: Repository) {
    this.repository = repository;
    return this;
  }

  protected createReleaseController() {
    return new GiteaRepoReleaseController(this);
  }

  protected createCommitsController() {
    return new GiteaRepoCommitsController(this);
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

  async getTree(sha: string) {
    const response = await this.api.repos.getTree(this.owner, this.name, sha);
    return response.data;
  }

  async deleteRepo() {
    const response = await this.api.repos.repoDelete(this.owner, this.name);
    return response.data;
  }

  async getReviewers() {
    const response = await this.api.repos.repoGetReviewers(
      this.owner,
      this.name
    );
    return response.data;
  }

  async generateFromTemplate(
    newName: string,
    opts: GenerateRepoOption,
    owner = this.owner,
    repoName = this.name
  ) {
    const fullOpts = {
      ...opts,
      name: newName,
    };
    const response = await this.api.repos.generateRepo(
      owner,
      repoName,
      fullOpts
    );
    return response.data;
  }
}
