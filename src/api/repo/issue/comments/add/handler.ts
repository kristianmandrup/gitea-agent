import { Action, CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { addIssueComment } from "./definition";

export const buildCreateIssueCommentHandler = (main: IMainController) =>
  new CreateIssueCommentActionHandler(main);

export class CreateIssueCommentActionHandler extends CompositeActionHandler {
  name = "create_issue";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { id, body } = action.fnArgs;
    const data = await this.main.repos.issues.comments.addComment(body, id);
    console.log({ data });
  }

  get definition(): any {
    return addIssueComment;
  }
}
