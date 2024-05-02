import { CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { buildCreateIssueCommentHandler } from "./add";
import { buildGetIssueCommentsHandler } from "./get";

export const buildReleaseHandler = (main: IMainController) =>
  new RepoReleaseActionHandler(main);

export class RepoReleaseActionHandler extends CompositeActionHandler {
  get handlers() {
    return [buildCreateIssueCommentHandler, buildGetIssueCommentsHandler];
  }
}
