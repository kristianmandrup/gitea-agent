import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreatePullRequestHandler } from "./create";
import { buildDeletePullRequestHandler } from "./delete";
import { buildGetPullRequestHandler } from "./get";
import { buildIsPullRequestMergedHandler } from "./is_merged";
import { buildListPullRequestsHandler } from "./list";
import { buildMergePullRequestHandler } from "./merge";

export const buildPullRequestsHandler = (main: IMainController) =>
  new RepoPullRequestsActionHandler(main);

export class RepoPullRequestsActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreatePullRequestHandler,
      buildDeletePullRequestHandler,
      buildGetPullRequestHandler,
      buildListPullRequestsHandler,
      buildIsPullRequestMergedHandler,
      buildMergePullRequestHandler,
    ];
  }
}
