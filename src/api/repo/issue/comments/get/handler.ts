import { Action, CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { getIssueComments } from "./definition";

export const buildGetIssueCommentsHandler = (main: IMainController) =>
  new GetIssueCommentActionHandler(main);

export class GetIssueCommentActionHandler extends CompositeActionHandler {
  name = "get_release";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { id } = action.arguments;
    const data = await this.main.repos.issues.comments.getComments(id);
    console.log({ data });
  }

  get definition(): any {
    return getIssueComments;
  }
}
