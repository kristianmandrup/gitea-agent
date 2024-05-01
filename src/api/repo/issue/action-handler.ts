import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreateIssueHandler } from "./create";
import { buildDeleteIssueHandler } from "./delete";
import { buildGetIssueHandler } from "./get";
import { buildListIssuesHandler } from "./list";
import { buildOpenIssueHandler } from "./open";
import { buildCloseIssueHandler } from "./close";
import { buildEditIssueHandler } from "./edit";

export const buildReleaseHandler = (main: IMainController) =>
  new RepoReleaseActionHandler(main);

export class RepoReleaseActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreateIssueHandler,
      buildDeleteIssueHandler,
      buildGetIssueHandler,
      buildListIssuesHandler,
      buildOpenIssueHandler,
      buildCloseIssueHandler,
      buildEditIssueHandler,
    ];
  }
}
