import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { listTeams } from "./definition";

export const buildListOrgTeamHandler = (main: IMainController) =>
  new ListOrgTeamActionHandler(main);

export class ListOrgTeamActionHandler extends CompositeActionHandler {
  name = "list_teams";

  async handle(action: Action) {
    const { limit } = action.fnArgs;
    const data = await this.main.orgs.teams.list({ limit });
    console.log({ data });
  }

  get definition(): any {
    return listTeams;
  }
}
