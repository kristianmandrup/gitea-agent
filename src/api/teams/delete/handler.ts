import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { deleteTeam } from "./definition";

export const buildDeleteTeamHandler = (main: IMainController) =>
  new DeleteTeamActionHandler(main);

export class DeleteTeamActionHandler extends CompositeActionHandler {
  name = "delete_team";

  async handle(action: Action) {
    const { id } = action.fnArgs;
    if (!id) {
      throw new Error("Missing id");
    }
    const data = await this.main.teams.delete(id);
    console.log({ data });
  }

  get definition(): any {
    return deleteTeam;
  }
}
