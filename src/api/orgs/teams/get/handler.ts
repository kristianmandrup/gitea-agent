import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { getTeam } from "./definition";

export const buildGetOrgTeamHandler = (main: IMainController) =>
  new GetOrgTeamActionHandler(main);

export class GetOrgTeamActionHandler extends CompositeActionHandler {
  name = "get_team";

  async handle(action: Action) {
    const { id } = action.fnArgs;
    if (!id) {
      throw new Error("Missing id");
    }
    const data = await this.main.orgs.teams.getById(id);
    console.log({ data });
  }

  get definition(): any {
    return getTeam;
  }
}
