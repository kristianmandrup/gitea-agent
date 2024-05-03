import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deletePullRequest } from "./definition";

export const buildDeletePullRequestHandler = (main: IMainController) =>
  new DeletePullRequestActionHandler(main);

export class DeletePullRequestActionHandler extends CompositeActionHandler {
  name = "delete_pull_request";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const id = Number(action.parameters.id);
    const data = await this.main.repos.pullRequests.delete(id);
    console.log({ data });
  }

  get definition(): any {
    return deletePullRequest;
  }
}
