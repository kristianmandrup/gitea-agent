import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteTeam } from "./definition";

export const buildDeleteTeamHandler = (main: IMainController) =>
  new CreateTeamActionHandler(main);

export class CreateTeamActionHandler extends CompositeActionHandler {
  name = "delete_team";

  async handle(action: Action) {
    const data = await this.main.repos.teams.delete(action.name);
    console.log({ data });
  }

  get definition(): any {
    return deleteTeam;
  }
}
