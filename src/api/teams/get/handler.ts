import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { getTeam } from "./definition";

export const buildGetTeamHandler = (main: IMainController) =>
  new GetTeamActionHandler(main);

export class GetTeamActionHandler extends CompositeActionHandler {
  name = "get_team";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { id } = action.fnArgs;
    const data = await this.main.teams.getById(id);
    console.log({ data });
  }

  get definition(): any {
    return getTeam;
  }
}
