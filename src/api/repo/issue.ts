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
}
