import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { closeIssue } from "./definition";

export const buildCloseIssueHandler = (main: IMainController) =>
  new CloseIssueActionHandler(main);

export class CloseIssueActionHandler extends CompositeActionHandler {
  name = "close_issue";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const data = await this.main.repos.issues.edit({ state: "close" });
    console.log({ data });
  }

  get definition(): any {
    return closeIssue;
  }
}
