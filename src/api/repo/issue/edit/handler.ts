import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { editIssue } from "./definition";

export const buildEditIssueHandler = (main: IMainController) =>
  new EditIssueActionHandler(main);

export class EditIssueActionHandler extends CompositeActionHandler {
  name = "edit_issue";

  async handle(action: Action) {
    /** EditIssueOption options for editing an issue */
    // interface EditIssueOption {
    //     /** deprecated */
    //     assignee?: string;
    //     assignees?: string[];
    //     body?: string;
    //     /** @format date-time */
    //     due_date?: string;
    //     /** @format int64 */
    //     milestone?: number;
    //     ref?: string;
    //     state?: string;
    //     title?: string;
    //     unset_due_date?: boolean;
    // }
    if (!this.validate(action)) return;
    const opts = action.arguments;
    const data = await this.main.repos.issues.edit(opts);
    console.log({ data });
  }

  get definition(): any {
    return editIssue;
  }
}
