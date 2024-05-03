import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { isPullRequestMerged } from "./definition";

export const buildIsPullRequestMergedHandler = (main: IMainController) =>
  new IsPullRequestMergedActionHandler(main);

export class IsPullRequestMergedActionHandler extends CompositeActionHandler {
  name = "is_pull_request_merged";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const id = Number(action.parameters.id);
    const data = await this.main.repos.pullRequests.isMerged(id);
    console.log({ data });
  }

  get definition(): any {
    return isPullRequestMerged;
  }
}
