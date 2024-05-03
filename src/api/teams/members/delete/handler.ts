import { Action, CompositeActionHandler } from "../../../actions";
import { IMainController } from "../../../main";
import { deleteTeamMember } from "./definition";

export const buildDeleteTeamHandler = (main: IMainController) =>
  new DeleteTeamActionHandler(main);

export class DeleteTeamActionHandler extends CompositeActionHandler {
  name = "delete_team_member";

  async handle(action: Action) {
    if (!this.validate(action)) return;
    const { username } = action.parameters;
    const data = await this.main.teams.members.delete(username);
    console.log({ data });
  }

  get definition(): any {
    return deleteTeamMember;
  }
}
