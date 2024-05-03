import { CompositeActionHandler } from "../actions";
import { IMainController } from "../main";
import { buildEditTeamHandler } from "./edit";
import { buildDeleteTeamHandler } from "./delete";
import { buildGetTeamHandler } from "./get";
import { buildTeamMembersHandler } from "./members";
import { buildTeamReposHandler } from "./repos";

export const buildTeamHandler = (main: IMainController) =>
  new TeamActionHandler(main);

export class TeamActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildGetTeamHandler,
      buildDeleteTeamHandler,
      buildEditTeamHandler,
      buildTeamMembersHandler,
      buildTeamReposHandler,
    ];
  }
}
