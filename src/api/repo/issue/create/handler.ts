import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createIssue } from "./definition";

export const buildCreateIssueHandler = (main: IMainController) =>
  new CreateIssueActionHandler(main);

export class CreateIssueActionHandler extends CompositeActionHandler {
  name = "create_issue";

  async handle(action: Action) {
    if (!action.fnArgs.title) {
      throw new Error("Missing title");
    }
    const opts = action.fnArgs;
    const { title, body } = action.fnArgs;
    const data = await this.main.repos.issues.create(title, body, opts);
    console.log({ data });
  }

  get definition(): any {
    return createIssue;
  }
}
