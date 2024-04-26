import { CreateIssueOption, Issue } from "gitea-js";
import { RepoAccesser } from "./repo-accesser";
import { GiteaRepositoryController } from "./repository";

export interface IIssueController {
  createIssue(
    title: string,
    body: string,
    opts: CreateIssueOption
  ): Promise<Issue>;
}

export class GiteaRepoIssueController extends RepoAccesser {
  issue?: Issue;

  constructor(repository: GiteaRepositoryController) {
    super(repository);
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
