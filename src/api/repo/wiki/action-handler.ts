import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreateWikiPageHandler } from "./create";
import { buildDeleteWikiPageHandler } from "./delete";
import { buildGetPullRequestReviewHandler } from "./get";
import { buildListPullRequestReviewsHandler } from "./list";

export const buildWikiHandler = (main: IMainController) =>
  new RepoWikiActionHandler(main);

export class RepoWikiActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreateWikiPageHandler,
      buildDeleteWikiPageHandler,
      buildGetPullRequestReviewHandler,
      buildListPullRequestReviewsHandler,
    ];
  }
}
