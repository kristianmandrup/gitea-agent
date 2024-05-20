import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildCreateOrgTeamHandler } from "./create";
import { buildOrgTeamReposHandler } from "./repos";
import { buildListOrgTeamHandler } from "./list";
// import {} from "./repos";

export const buildOrgTeamsHandler = (main: IMainController) =>
  new RepoOrgTeamsActionHandler(main);

export class RepoOrgTeamsActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildCreateOrgTeamHandler,
      buildOrgTeamReposHandler,
      buildListOrgTeamHandler,
    ];
  }
}
