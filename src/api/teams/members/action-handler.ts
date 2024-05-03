import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildListTeamHandler } from "./list";
import { buildDeleteTeamHandler } from "./delete";
import { buildAddTeamHandler } from "./add";

export const buildTeamMembersHandler = (main: IMainController) =>
  new TeamMembersActionHandler(main);

export class TeamMembersActionHandler extends CompositeActionHandler {
  get handlers() {
    return [buildAddTeamHandler, buildDeleteTeamHandler, buildListTeamHandler];
  }
}
