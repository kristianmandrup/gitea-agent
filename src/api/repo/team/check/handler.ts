import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { checkTeam } from "./definition";

export const buildCheckTeamHandler = (main: IMainController) =>
  new CheckTeamActionHandler(main);

export class CheckTeamActionHandler extends CompositeActionHandler {
  name = "check_team";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const { name } = action.fnArgs;
    const data = await this.main.repos.teams.check(name);
    console.log({ data });
  }

  get definition(): any {
    return checkTeam;
  }
}
