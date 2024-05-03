import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { mergePullRequest } from "./definition";

export const buildMergePullRequestHandler = (main: IMainController) =>
  new MergePullRequestActionHandler(main);

export class MergePullRequestActionHandler extends CompositeActionHandler {
  name = "merge_pull_request";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { id, mergeType } = action.parameters;
    const number = Number(id);
    const data = await this.main.repos.pullRequests.merge(number, mergeType);
    console.log({ data });
  }

  get definition(): any {
    return mergePullRequest;
  }
}
