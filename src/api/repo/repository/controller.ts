import { EditRepoOption, GenerateRepoOption, Repository, User } from "gitea-js";
import {
  GiteaCollaboratorController,
  ICollaboratorController,
} from "../collaborator/controller";
import { GiteaBranchController, IBranchController } from "../branch";
import {
  GiteaPullRequestController,
  IPullRequestController,
} from "../pull-request/controller";
import {
  GiteaRepoTeamController,
  IRepoTeamController,
} from "../team/controller";
import { GiteaRepoTopicController, IRepoTopicController } from "../topic";
import {
  GiteaRepoIssueController,
  IRepoIssueController,
} from "../issue/controller";
import { IMainController } from "../../main";
import { GiteaMainAccessor, IMainAccessor } from "../../main-accesser";
import {
  GiteaRepoFilesController,
  IRepoFilesController,
} from "../files/controller";
import {
  GiteaRepoCommitsController,
  IRepoCommitsController,
} from "../commits/controller";
import {
  GiteaRepoReleaseController,
  IRepoReleaseController,
} from "../releases/controller";
import {
  GiteaRepoIssueMilestoneController,
  IRepoIssueMilestoneController,
} from "../milestone/controller";
import {
  GiteaRepoWikiPageController,
  IWikiPageController,
} from "../wiki/controller";
import { RepoBaseController } from "../repo-base-controller";

export interface IRepoController extends IMainAccessor {
  owner: string;
  name: string;
  repoData: any;
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
  milestones: IRepoIssueMilestoneController;
  wikis: IWikiPageController;

  tree(sha: string): Promise<any>;
  listReviewers(): Promise<User[]>;
  listAssignees(): Promise<User[]>;
  get(): Promise<Repository>;
  edit(opts: EditRepoOption): Promise<Repository>;
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
  // extends RepoBaseController
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
  milestones: IRepoIssueMilestoneController;
  wikis: IWikiPageController;

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
    this.milestones = this.createMilestonesController();
    this.wikis = this.createWikiController();
  }

  get repoData() {
    return {
      owner: this.owner,
      repoName: this.name,
    };
  }

  public setRepository(repository: Repository) {
    this.repository = repository;
    return this;
  }

  protected createWikiController() {
    return new GiteaRepoWikiPageController(this);
  }

  protected createMilestonesController() {
    return new GiteaRepoIssueMilestoneController(this);
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

  baseLabel = "repo";

  $api = this.api.repos;

  async get() {
    const label = this.labelFor("get");
    const data = {};
    try {
      const response = await this.$api.repoGet(this.owner, this.name);
      return await this.notifyAndReturn<Repository>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async edit(opts: EditRepoOption) {
    const label = this.labelFor("edit");
    const data = { ...opts };
    try {
      const response = await this.$api.repoEdit(this.owner, this.name, opts);
      return await this.notifyAndReturn<Repository>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async tree(sha: string) {
    const label = this.labelFor("tree");
    const data = {};
    try {
      const response = await this.$api.getTree(this.owner, this.name, sha);
      return await this.notifyAndReturn<Repository>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async delete() {
    const label = this.labelFor("delete");
    const data = {};
    try {
      const response = await this.$api.repoDelete(this.owner, this.name);
      return await this.notifyAndReturn<Repository>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async listAssignees() {
    const label = this.labelFor("assignees:list");
    const data = {};
    try {
      const response = await this.$api.repoGetAssignees(this.owner, this.name);
      return await this.notifyAndReturn<Repository>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }

  async listReviewers() {
    const label = this.labelFor("get");
    const data = {};
    try {
      const response = await this.$api.repoGetReviewers(this.owner, this.name);
      return await this.notifyAndReturn<Repository>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
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
    const label = this.labelFor("generate:from_template");
    const data = {};
    try {
      const response = await this.$api.generateRepo(owner, repoName, fullOpts);
      return await this.notifyAndReturn<Repository>(
        {
          label,
          response,
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn({ label, error }, data);
    }
  }
}
