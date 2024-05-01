import { CompositeActionHandler } from "../../../../actions";
import { IMainController } from "../../../../main";
import { buildCreateReviewRequestsHandler } from "./create";
import { buildCancelReviewRequestsHandler } from "./cancel";

export const buildReleaseHandler = (main: IMainController) =>
  new RepoReleaseActionHandler(main);

export class RepoReleaseActionHandler extends CompositeActionHandler {
  get handlers() {
    return [buildCreateReviewRequestsHandler, buildCancelReviewRequestsHandler];
  }
}
