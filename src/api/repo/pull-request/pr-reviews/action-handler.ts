import { CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { buildCreatePullRequestReviewHandler } from "./create";
import { buildDeletePullRequestReviewHandler } from "./delete";
import { buildGetPullRequestReviewHandler } from "./get";
import { buildListPullRequestReviewsHandler } from "./list";
import { buildSetPullRequestIdHandler } from "./set_pr";
import { buildSubmitPullRequestReviewHandler } from "./submit";
import { buildDismissPullRequestReviewHandler } from "./dismiss";

export const buildReleaseHandler = (main: IMainController) =>
  new RepoReleaseActionHandler(main);

export class RepoReleaseActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreatePullRequestReviewHandler,
      buildDeletePullRequestReviewHandler,
      buildGetPullRequestReviewHandler,
      buildListPullRequestReviewsHandler,
      buildSetPullRequestIdHandler,
      buildSubmitPullRequestReviewHandler,
      buildDismissPullRequestReviewHandler,
    ];
  }
}
