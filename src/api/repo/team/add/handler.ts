import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { addTeam } from "./definition";

export const buildAddTeamHandler = (main: IMainController) =>
  new CreateTeamActionHandler(main);

export class CreateTeamActionHandler extends CompositeActionHandler {
  name = "add_team";

  async handle(action: Action) {
    const data = await this.main.repos.teams.add(action.name);
    console.log({ data });
  }

  get definition(): any {
    return addTeam;
  }
}
