import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getPullRequest } from "./definition";

export const buildGetPullRequestHandler = (main: IMainController) =>
  new GetPullRequestActionHandler(main);

export class GetPullRequestActionHandler extends CompositeActionHandler {
  name = "get_pull_request";

  async handle(action: Action) {
    if (!action.fnArgs.id) {
      throw new Error("Missing id");
    }
    const id = Number(action.fnArgs.id);
    const data = await this.main.repos.pullRequests.getSingle(id);
    console.log({ data });
  }

  get definition(): any {
    return getPullRequest;
  }
}
