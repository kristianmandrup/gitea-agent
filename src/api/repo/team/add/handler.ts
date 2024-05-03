import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { addTeam } from "./definition";

export const buildAddTeamHandler = (main: IMainController) =>
  new CreateTeamActionHandler(main);

export class CreateTeamActionHandler extends CompositeActionHandler {
  name = "add_team";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name } = action.fnArgs;
    const data = await this.main.repos.teams.add(name);
    console.log({ data });
  }

  get definition(): any {
    return addTeam;
  }
}
