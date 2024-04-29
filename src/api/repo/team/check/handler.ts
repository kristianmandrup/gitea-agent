import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { checkTeam } from "./definition";

export const buildCheckTeamHandler = (main: IMainController) =>
  new CheckTeamActionHandler(main);

export class CheckTeamActionHandler extends CompositeActionHandler {
  name = "check_branch";

  async handle(action: Action) {
    const data = await this.main.repos.teams.check(action.name);
    console.log({ data });
  }

  get definition(): any {
    return checkTeam;
  }
}
