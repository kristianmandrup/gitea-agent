import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getIssue } from "./definition";

export const buildGetIssueHandler = (main: IMainController) =>
  new GetIssueActionHandler(main);

export class GetIssueActionHandler extends CompositeActionHandler {
  name = "get_issue";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const id = action.parameters.id;
    const data = await this.main.repos.issues.getById(id);
    console.log({ data });
  }

  get definition(): any {
    return getIssue;
  }
}
