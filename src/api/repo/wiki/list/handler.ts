import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listWikiPages } from "./definition";

export const buildListPullRequestReviewsHandler = (main: IMainController) =>
  new ListPullRequestReviewsActionHandler(main);

export class ListPullRequestReviewsActionHandler extends CompositeActionHandler {
  name = "list_pull_requests";

  async handle(_action: Action) {
    const data = await this.main.repos.wikis.listPages();
    console.log({ data });
  }

  get definition(): any {
    return listWikiPages;
  }
}
