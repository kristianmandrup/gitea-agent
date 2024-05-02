import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildListTeamHandler } from "./list";
import { buildDeleteTeamHandler } from "./delete";
import { buildAddTeamHandler } from "./add";

export const buildTeamHandler = (main: IMainController) =>
  new TeamActionHandler(main);

export class TeamActionHandler extends CompositeActionHandler {
  get handlers() {
    return [buildAddTeamHandler, buildDeleteTeamHandler, buildListTeamHandler];
  }
}
