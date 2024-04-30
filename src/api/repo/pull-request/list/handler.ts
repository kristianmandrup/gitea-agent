import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listPullRequests } from "./definition";

export const buildListPullRequestsHandler = (main: IMainController) =>
  new ListPullRequestsActionHandler(main);

export class ListPullRequestsActionHandler extends CompositeActionHandler {
  name = "list_pull_requests";

  async handle(_action: Action) {
    const data = await this.main.repos.pullRequests.list();
    console.log({ data });
  }

  get definition(): any {
    return listPullRequests;
  }
}
