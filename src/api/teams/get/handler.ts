import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { getTeam } from "./definition";

export const buildGetTeamHandler = (main: IMainController) =>
  new GetTeamActionHandler(main);

export class GetTeamActionHandler extends CompositeActionHandler {
  name = "get_team";

  async handle(action: Action) {
    const { id } = action.fnArgs;
    if (!id) {
      throw new Error("Missing id");
    }
    const data = await this.main.teams.getById(id);
    console.log({ data });
  }

  get definition(): any {
    return getTeam;
  }
}
