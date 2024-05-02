import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { editTeam } from "./definition";

export const buildEditTeamHandler = (main: IMainController) =>
  new EditTeamActionHandler(main);

export class EditTeamActionHandler extends CompositeActionHandler {
  name = "edit_team";

  async handle(action: Action) {
    const { name } = action.fnArgs;
    if (!name) {
      throw new Error("Missing name");
    }
    const data = await this.main.teams.edit(name, action.fnArgs);
    console.log({ data });
  }

  get definition(): any {
    return editTeam;
  }
}
