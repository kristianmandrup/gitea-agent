import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getPullRequest } from "./definition";

export const buildGetPullRequestHandler = (main: IMainController) =>
  new GetPullRequestActionHandler(main);

export class GetPullRequestActionHandler extends CompositeActionHandler {
  name = "get_pull_request";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const id = Number(action.parameters.id);
    const data = await this.main.repos.pullRequests.getByIndex(id);
    console.log({ data });
  }

  get definition(): any {
    return getPullRequest;
  }
}
