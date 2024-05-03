import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteIssue } from "./definition";

export const buildDeleteIssueHandler = (main: IMainController) =>
  new DeleteIssueActionHandler(main);

export class DeleteIssueActionHandler extends CompositeActionHandler {
  name = "delete_issue";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const id = action.fnArgs.id;
    const data = await this.main.repos.issues.delete(id);
    console.log({ data });
  }

  get definition(): any {
    return deleteIssue;
  }
}
