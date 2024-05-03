import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildAddTeamHandler } from "./add";
import { buildDeleteTeamHandler } from "./delete";
import { buildCheckTeamHandler } from "./check";
import { buildListTeamHandler } from "./list";

export const buildRepoTeamHandler = (main: IMainController) =>
  new RepoTeamActionHandler(main);

export class RepoTeamActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildAddTeamHandler,
      buildDeleteTeamHandler,
      buildCheckTeamHandler,
      buildListTeamHandler,
    ];
  }
}
