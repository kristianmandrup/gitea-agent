import { CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { buildAddOrgTeamRepoHandler } from "./add";
import { buildRemoveOrgTeamRepoHandler } from "./remove";
import { buildListOrgTeamReposHandler } from "./list";

export const buildOrgTeamReposHandler = (main: IMainController) =>
  new RepoOrgTeamsActionHandler(main);

export class RepoOrgTeamsActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildOrgTeamReposHandler,
      buildAddOrgTeamRepoHandler,
      buildRemoveOrgTeamRepoHandler,
    ];
  }
}
