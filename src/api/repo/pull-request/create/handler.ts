import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { createPullRequest } from "./definition";

export const buildCreatePullRequestHandler = (main: IMainController) =>
  new CreatePullRequestActionHandler(main);

export class CreatePullRequestActionHandler extends CompositeActionHandler {
  name = "create_pull_request";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const opts = action.arguments;
    const data = await this.main.repos.pullRequests.create(opts);
    console.log({ data });
  }

  get definition(): any {
    return createPullRequest;
  }
}
