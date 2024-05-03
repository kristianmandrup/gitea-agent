import { CompositeActionHandler } from "../actions";
import { IMainController } from "../main";
import { buildBranchHandler } from "./branch";
import { buildCollaboratorHandler } from "./collaborator";
import { buildCommitsHandler } from "./commits";
import { buildFilesHandler } from "./files";
import { buildIssuesHandler } from "./issue";
import { buildMilestonesHandler } from "./milestone";
import { buildPullRequestsHandler } from "./pull-request";
import { buildReleasesHandler } from "./releases";
import { buildRepoTeamHandler } from "./team";
import { buildWikiHandler } from "./wiki";

export const buildRepoHandler = (main: IMainController) =>
  new RepoActionHandler(main);

export class RepoActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildBranchHandler,
      buildCollaboratorHandler,
      buildCommitsHandler,
      buildFilesHandler,
      buildIssuesHandler,
      buildMilestonesHandler,
      buildPullRequestsHandler,
      buildReleasesHandler,
      buildRepoTeamHandler,
      buildWikiHandler,
    ];
  }
}
