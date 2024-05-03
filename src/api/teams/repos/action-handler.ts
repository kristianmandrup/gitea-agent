import { CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { buildAddTeamRepoHandler } from "./add";
import { buildRemoveTeamRepoHandler } from "./remove";
import { buildListTeamReposHandler } from "./list";

export const buildTeamReposHandler = (main: IMainController) =>
  new TeamReposActionHandler(main);

export class TeamReposActionHandler extends CompositeActionHandler {
  get handlers() {
    return [
      buildAddTeamRepoHandler,
      buildListTeamReposHandler,
      buildRemoveTeamRepoHandler,
    ];
  }
}
