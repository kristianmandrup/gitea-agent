import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { openIssue } from "./definition";

export const buildOpenIssueHandler = (main: IMainController) =>
  new OpenIssueActionHandler(main);

export class OpenIssueActionHandler extends CompositeActionHandler {
  name = "close_issue";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const data = await this.main.repos.issues.edit({ state: "open" });
    console.log({ data });
  }

  get definition(): any {
    return openIssue;
  }
}
