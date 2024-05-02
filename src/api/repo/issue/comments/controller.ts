import { Comment, Issue } from "gitea-js";
import { RepoAccessor } from "../../repo-accesser";
import { IRepoController } from "../../repository/controller";

export interface IRepoIssueCommentController {
  addComment(body: string, index?: number): Promise<Comment>;
  getComments(id: number): Promise<Comment[]>;
}

export class GiteaRepoIssueCommentController
  extends RepoAccessor
  implements IRepoIssueCommentController
{
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

  async addComment(body: string, index = this.index) {
    if (!index) {
      throw new Error(`Issue is missing or has no index`);
    }
    const response = await this.api.repos.issueCreateComment(
      this.owner,
      this.repoName,
      index,
      { body }
    );
    const notification = {
      ...this.repoData,
      index,
      body,
    };
    await this.notify("issue:comment:add", notification);
    return response.data;
  }

  async getComments(index = this.index) {
    if (!index) {
      throw new Error("Missing issue index");
    }
    try {
      const response = await this.api.repos.issueGetComments(
        this.owner,
        this.repoName,
        index
      );
      const comments = response.data;
      const notification = {
        ...this.repoData,
        index,
        comments,
      };
      await this.notify("issue:comments:get", notification);
      return comments;
    } catch (error) {
      const notification = {
        ...this.repoData,
        index,
        error,
      };
      await this.notifyError("issue:comments:get", notification);
      return [];
    }
  }
}
