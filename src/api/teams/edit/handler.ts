import { Action, CompositeActionHandler } from "../../actions";
import { IMainController } from "../../main";
import { editTeam } from "./definition";

export const buildEditTeamHandler = (main: IMainController) =>
  new EditTeamActionHandler(main);

export class EditTeamActionHandler extends CompositeActionHandler {
  name = "edit_team";

  async handle(action: Action) {
    if (!this.validateRequired(action)) return;
    const { name } = action.fnArgs;
    const data = await this.main.teams.edit(name, action.fnArgs);
    console.log({ data });
  }

  get definition(): any {
    return editTeam;
  }
}
