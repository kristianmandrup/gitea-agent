import { CreateIssueOption, Issue } from "gitea-js";
import { RepoAccessor } from "./repo-accesser";
import { GiteaRepositoryController, IRepoController } from "./repository";

export interface IRepoIssueController {
  createIssue(
    title: string,
    body: string,
    opts: CreateIssueOption
  ): Promise<Issue>;
}

export class GiteaRepoIssueController extends RepoAccessor {
  issue?: Issue;

  constructor(repo: IRepoController) {
    super(repo);
  }

  get index() {
    return this.issue?.id;
  }

  setIssue(issue: Issue) {
    this.issue = issue;
  }

  async createIssue(title: string, body: string, opts: CreateIssueOption) {
    const response = await this.api.repos.issueCreateIssue(
      this.owner,
      this.repoName,
      { ...opts, body, title }
    );
    return response.data;
  }

  async createComment(body: string) {
    if (!this.index) {
      throw new Error(`Issue is missing or has no index`);
    }
    const response = await this.api.repos.issueCreateComment(
      this.owner,
      this.repoName,
      this.index,
      { body }
    );
    return response.data;
  }

  // issueCreateMilestone: (owner: string, repo: string, body: CreateMilestoneOption
  // issueGetMilestonesList: (owner: string, repo: string, query?
  // issueGetMilestone: (owner: string, repo: string, id: string
  // issueDeleteMilestone: (owner: string, repo: string, id: string
  // issueEditMilestone: (owner: string, repo: string, id: string, body: EditMilestoneOption

  // issueSearchIssues: (query?)

  // repoGetIssueTemplates: (owner: string, repo: string

  // issueGetIssue: (owner: string, repo: string, index: number

  // issueListIssueAttachments: (owner: string, repo: string, index: number
  // issueGetIssueAttachment: (owner: string, repo: string, index: number, attachmentId: number

  // issueCreateIssueAttachment: (owner: string, repo: string, index: number, data: {
  //   /** attachment to upload */
  //   attachment: File;

  // issueGetComments: (owner: string, repo: string, index: number

  // issueListBlocks: (owner: string, repo: string, index: string
  // issueCreateIssueBlocking: (owner: string, repo: string, index: string, body: IssueMeta
  // issueRemoveIssueBlocking: (owner: string, repo: string, index: string, body: IssueMeta

  // issueCheckSubscription: (owner: string, repo: string, index: number
  // issueAddSubscription: (owner: string, repo: string, index: number, user: string

  // Get users who subscribed on an issue.
  // issueSubscriptions: (owner: string, repo: string, index: number

  // issueListIssues: (owner: string, repo: string

  // issueAddLabel: (owner: string, repo: string, index: number, body: IssueLabelsOption

  // issueGetLabels: (owner: string, repo: string, index: number
}
