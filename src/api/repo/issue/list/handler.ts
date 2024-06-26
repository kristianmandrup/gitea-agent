import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listIssues } from "./definition";

export const buildListIssuesHandler = (main: IMainController) =>
  new ListIssuesActionHandler(main);

export class ListIssuesActionHandler extends CompositeActionHandler {
  name = "list_issues";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const data = await this.main.repos.issues.list();
    console.log({ data });
  }

  get definition(): any {
    return listIssues;
  }
}
