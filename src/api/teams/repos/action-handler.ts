import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildAddTeamRepoHandler } from "./add";
import { buildRemoveTeamRepoHandler } from "./remove";
import { buildListTeamReposHandler } from "./list";

export const buildTeamHandler = (main: IMainController) =>
  new TeamActionHandler(main);

export class TeamActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildAddTeamRepoHandler,
      buildListTeamReposHandler,
      buildRemoveTeamRepoHandler,
    ];
  }
}
