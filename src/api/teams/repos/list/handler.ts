import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listTeamRepos } from "./definition";

export const buildListTeamReposHandler = (main: IMainController) =>
  new ListTeamReposActionHandler(main);

export class ListTeamReposActionHandler extends CompositeActionHandler {
  name = "list_team_repo";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { id } = action.fnArgs;
    const data = await this.main.teams.repos.list(id);
    console.log({ data });
  }

  get definition(): any {
    return listTeamRepos;
  }
}
