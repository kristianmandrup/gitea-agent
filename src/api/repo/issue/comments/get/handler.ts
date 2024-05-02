import { Action, CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { getIssueComments } from "./definition";

export const buildGetIssueCommentsHandler = (main: IMainController) =>
  new GetIssueCommentActionHandler(main);

export class GetIssueCommentActionHandler extends CompositeActionHandler {
  name = "get_release";

  async handle(action: Action) {
    if (!action.fnArgs.id) {
      throw new Error("Missing id");
    }
    const id = action.fnArgs.id;
    const data = await this.main.repos.issues.comments.getComments(id);
    console.log({ data });
  }

  get definition(): any {
    return getIssueComments;
  }
}
