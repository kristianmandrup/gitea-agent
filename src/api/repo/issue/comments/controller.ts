import { Comment, Issue } from "gitea-js";
import { RepoAccessor } from "../../repo-accesser";
import { IRepoController } from "../../repository/controller";
import { RepoBaseController } from "../../repo-base-controller";

export interface IRepoIssueCommentController {
  addComment(body: string, index?: number): Promise<Comment | undefined>;
  getComments(id: number): Promise<Comment[]>;
}

export class GiteaRepoIssueCommentController
  extends RepoBaseController
  implements IRepoIssueCommentController
{
  baseLabel = "repo:issue:comments";

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
    const label = "issue:comment:add";
    const data = { body, index };
    try {
      const response = await this.api.repos.issueCreateComment(
        this.owner,
        this.repoName,
        index,
        { body }
      );
      return await this.notifyAndReturn<Comment>(
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

  async getComments(index = this.index) {
    if (!index) {
      throw new Error("Missing issue index");
    }
    const label = "issue:comments:get";
    const data = { index };
    try {
      const response = await this.api.repos.issueGetComments(
        this.owner,
        this.repoName,
        index
      );
      return await this.notifyAndReturn<Comment[]>(
        {
          label,
          response,
          returnVal: [],
        },
        data
      );
    } catch (error) {
      return await this.notifyErrorAndReturn(
        { label, error, returnVal: [] },
        data
      );
    }
  }
}
