import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getWikiPage } from "./definition";

export const buildGetPullRequestReviewHandler = (main: IMainController) =>
  new GetPullRequestReviewActionHandler(main);

export class GetPullRequestReviewActionHandler extends CompositeActionHandler {
  name = "get_pull_request";

  async handle(action: Action) {
    if (!action.fnArgs.pageName) {
      throw new Error("Missing pageName");
    }
    const pageName = action.fnArgs.id;
    const data = await this.main.repos.wikis.getPage(pageName);
    console.log({ data });
  }

  get definition(): any {
    return getWikiPage;
  }
}
