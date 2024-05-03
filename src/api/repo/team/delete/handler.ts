import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteTeam } from "./definition";

export const buildDeleteTeamHandler = (main: IMainController) =>
  new DeleteTeamActionHandler(main);

export class DeleteTeamActionHandler extends CompositeActionHandler {
  name = "delete_team";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { name } = action.fnArgs;
    const data = await this.main.repos.teams.delete(name);
    console.log({ data });
  }

  get definition(): any {
    return deleteTeam;
  }
}
