import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listTeamRepos } from "./definition";

export const buildListTeamReposHandler = (main: IMainController) =>
  new ListTeamReposActionHandler(main);

export class ListTeamReposActionHandler extends CompositeActionHandler {
  name = "list_team_repo";

  async handle(action: Action) {
    const { id } = action.fnArgs;
    if (!id) {
      throw new Error("Missing id");
    }
    const data = await this.main.teams.repos.list(id);
    console.log({ data });
  }

  get definition(): any {
    return listTeamRepos;
  }
}
